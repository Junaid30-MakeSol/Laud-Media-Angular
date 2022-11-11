import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { map, filter, take, finalize } from 'rxjs/operators';

const credentialsKey = 'credentials';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
};
const authenticationParams = {
  client_id: 'consoleApp',
  client_secret: '123@abc',
  grant_type: {
    accessToken: 'password',
    refreshToken: 'refresh_token',
  },
  auth_type: 'F',
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private _credentials: Credentials | null;
  private isRefreshingToken = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  get credential(): Credentials {
    return this.credentialsService.credentials;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    return this.requestAccessToken(context.username, context.password).pipe(
      map((data) => {
        const credentials = this.castToCredential(data);
        this.credentialsService.setCredentials(credentials, context.remember);
        return credentials;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  refreshToken(): Observable<Credentials> {
    const credentials = this.credential;
    if (this.isRefreshingToken) {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        map((data) => {
          const newCredentials = this.castToCredential(data);
          return newCredentials;
        })
      );
    } else {
      this.isRefreshingToken = true;

      this.refreshTokenSubject.next(null);

      return this.refreshAccessToken(credentials.refresh_token, credentials.access_token).pipe(
        map((data) => {
          const newCredentials = this.castToCredential(data);
          this.credentialsService.setCredentials(newCredentials, credentials.isRemember);
          this.isRefreshingToken = false;
          this.refreshTokenSubject.next(data);
          return newCredentials;
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    }
  }

  getAuthToken(): Observable<string> {
    const credentials = this.credential;
    if (credentials != null) {
      if (!this.isTokenValid(credentials.expires_time)) {
        return this.refreshToken().pipe(map((data) => data.access_token));
      }
      return of(credentials.access_token);
    }

    return null;
  }

  private isTokenValid(expires_time: Date): boolean {
    const now = new Date();
    expires_time = new Date(expires_time);
    return expires_time.getTime() > now.getTime();
  }

  private requestAccessToken(username: string, password: string): Observable<Credentials> {
    const body = new HttpParams()
      .set('client_id', authenticationParams.client_id)
      .set('client_secret', authenticationParams.client_secret)
      .set('grant_type', authenticationParams.grant_type.accessToken)
      .set('username', username)
      .set('password', password)
      .set('scope', authenticationParams.auth_type);

    return this.httpClient.post<Credentials>('/token', body.toString(), httpOptions);
  }

  private refreshAccessToken(refresh_token: string, access_token: string): Observable<Credentials> {
    const body = new HttpParams()
      .set('client_id', authenticationParams.client_id)
      .set('client_secret', authenticationParams.client_secret)
      .set('grant_type', authenticationParams.grant_type.refreshToken)
      .set('refresh_token', refresh_token);

    const refreshOptions = httpOptions;
    refreshOptions.headers.set('Authorization', `Bearer ${access_token}`);

    return this.httpClient.post<Credentials>('/token', body.toString(), refreshOptions);
  }

  private castToCredential(data: any): Credentials {
    return ({
      userName: data.userName,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      expires_time: new Date(data['.expires']),
      issued_time: new Date(data['.issued']),
      // role: data.role,
      role: data.role.split(','),
      companyName: data.companName,
    } as unknown) as Credentials;
  }

  /* private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      this._credentials.isRemember = remember;
      storage.setItem(credentialsKey, JSON.stringify(this._credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  } */

  /* private updateSelectedSchool(
    refresh_token: string,
    access_token: string,
    current_company: string
  ): Observable<Credentials> {
    const body = new HttpParams()
      .set('client_id', authenticationParams.client_id)
      .set('client_secret', authenticationParams.client_secret)
      .set('grant_type', authenticationParams.grant_type.refreshToken)
      .set('refresh_token', refresh_token)
      .set('current_company', current_company);

    const refreshOptions = httpOptions;
    refreshOptions.headers.set('Authorization', `Bearer ${access_token}`);

    return this.httpClient.post<Credentials>('/token', body.toString(), refreshOptions);
  } */
}
