import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { Logger } from '@core';
import { CredentialsService } from './credentials.service';

const log = new Logger('ChildGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.credentialsService.credentials;
    if (currentUser) {
      // check if route is restricted by role
      const intersection = route.data.roles.filter((e: any) => currentUser.role.includes(e));
      return intersection.length > 0;

      // role not authorised so redirect to home page

      // authorised so return true
    }

    log.debug('Not authenticated, redirecting to login and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
