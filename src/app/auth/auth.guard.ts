import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.hasProvider && this.authService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.authService.setReturnUrl(state.url);
    this.router.navigate(['auth', 'login']);
    return false;
  }
}
