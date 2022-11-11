import { Injectable } from '@angular/core';

export interface Credentials {
  userName: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_time: Date;
  issued_time: Date;
  isRemember?: boolean;
  role: Role[];
  companyName: string;
}

export enum Role {
  SysAdmin = 'System admin',
  CompanyAdmin = 'Firma admin',
  Member = 'Medlem',
  CourseAdmin = 'Kurs admin',
}
const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor() {
    // const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    const savedCredentials = sessionStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? sessionStorage : sessionStorage;
      // const storage =  sessionStorage;

      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      // localStorage.removeItem(credentialsKey);
    }
  }

  hasRole(role: Role) {
    const currentUser = this.credentials;
    if (currentUser) {
      return currentUser.role.indexOf(role) >= 0;
    }

    return false;
  }
}
