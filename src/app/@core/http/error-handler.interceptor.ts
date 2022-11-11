import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { Router } from '@angular/router';
// import { AuthenticationService } from '@app/auth';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router // private authenticationService: AuthenticationService, // private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }

  private handleGatewayTimeoutError(err: HttpErrorResponse): Observable<any> {
    // navigate /delete cookies or whatever
    this.router.navigate([`/error`], { queryParams: { returnUrl: err.url } });
    // if you've caught / handled the error, you don't want to rethrow it
    // unless you also want downstream consumers to have to handle it as well.
    return of(err.message);
  }

  private handleInterServerError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    // this.toastr.error(err.error, 'Feil!');
    return of(err.message);
  }

  private handleConflictError(err: HttpErrorResponse): Observable<any> {
    // this.toastr.error('Det er noe feil. Prøv senere eller kontakt administrater', 'Feil!');
    return of(err.message);
  }

  /* private handleBadRequestError(err: HttpErrorResponse): Observable<any> {
    // handle refresh token error
    if (err.url.includes('/token')) {
      this.authenticationService.logout().subscribe(() => {
        this.router.navigate(['/login'], { replaceUrl: true });
      });
    }
    // this.toastr.error('Det er noe feil. Prøv senere eller kontakt administrater', 'Feil!');
    return of(err.message);
  } */
}
