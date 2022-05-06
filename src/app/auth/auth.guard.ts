import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.checkAuth(this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? '');
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state.url);
  }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state.url);
  }

  private checkAuth(url: string) {
    if (this.authService.isAuthenticated) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.authService.setReturnUrl(url);
    this.router.navigate(['auth', 'login'], { preserveFragment: true });
    return false;
  }
}
