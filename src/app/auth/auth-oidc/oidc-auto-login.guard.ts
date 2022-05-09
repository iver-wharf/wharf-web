import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../auth.service';

/*
Forked from: https://github.com/damienbod/angular-auth-oidc-client/tree/release_14_0_0
Path: projects/angular-auth-oidc-client/src/lib/auto-login/auto-login-partial-routes.guard.ts

MIT License

Copyright (c) 2020 damienbod

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

@Injectable({
  providedIn: 'root',
})
export class OidcAutoLoginRoutesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private oidcAuthService: OidcSecurityService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuth(state.url);
  }

  private checkAuth(url: string): Observable<boolean> {
    const loginResponse$ = this.oidcAuthService.checkAuth();

    return loginResponse$.pipe(
      take(1),
      map(({ isAuthenticated, userData }) => {

        if (isAuthenticated) {
          this.authService.setLoggedIn(userData?.name);
          this.authService.navigateBackToReturnUrl();
        } else {
          this.authService.setReturnUrl(url);
          this.oidcAuthService.authorize();
        }

        return isAuthenticated;
      }),
    );

  }
}
