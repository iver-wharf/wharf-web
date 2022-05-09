import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state.url);
  }

  private checkAuth(url: string) {
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.authService.setReturnUrl(url);
    this.router.navigate(['auth', 'login'], { preserveFragment: true });
    return false;
  }
}
