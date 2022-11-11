import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@app/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    // Skip token relevant requests
    if (request.url.includes('/token')) {
      return next.handle(request);
    }
    if (request.url.includes('/product')) {
      return next.handle(request);
    }
    return this.authenticationService.getAuthToken().pipe(
      switchMap((access_token) => {
        return next.handle(this.addTokenToRequest(request, access_token));
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
