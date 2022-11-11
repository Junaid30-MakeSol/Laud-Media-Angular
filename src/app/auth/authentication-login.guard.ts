import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '@app/@core';
import { CredentialsService } from './credentials.service';

// const log = new Logger('AuthenticationLoginGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationLoginGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(): boolean {
    if (!this.credentialsService.isAuthenticated()) {
      return true;
    }

    // log.debug('Authenticated, redirecting to homepage');
    this.router.navigate(['/'], { replaceUrl: true });
    return false;
  }
}
