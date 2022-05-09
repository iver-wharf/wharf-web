import { Component, OnInit } from '@angular/core';
import {
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { Observable, pluck } from 'rxjs';
import { environment } from 'src/environments/environment';

/*
 * Largely from damienbod/angular-auth-oidc-client samples. See-
 * https://github.com/damienbod/angular-auth-oidc-client/tree/main/projects/sample-code-flow-refresh-tokens/src/app
 */
@Component({
  selector: 'wh-auth',
  templateUrl: './oidc-home.component.html',
})
export class OidcHomeComponent implements OnInit {

  configuration: OpenIdConfiguration;
  userData$: Observable<UserDataResult>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    public oidcSecurityService: OidcSecurityService,
  ) { }

  ngOnInit() {
    this.configuration = environment.oidcConfig;
    this.userData$ = this.oidcSecurityService.userData$;
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$
      .pipe(pluck('isAuthenticated'));

    this.oidcSecurityService.isAuthenticated$.subscribe({
      next: b => console.log('is authenticated? ', b),
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }

}
