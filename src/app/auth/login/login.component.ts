import { Component, OnInit } from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

/*
 * Largely from damienbod/angular-auth-oidc-client samples. See-
 * https://github.com/damienbod/angular-auth-oidc-client/tree/main/projects/sample-code-flow-refresh-tokens/src/app
 */
@Component({
  selector: 'wh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  configuration: OpenIdConfiguration;
  userData$: Observable<UserDataResult>;
  isAuthenticated = false;

  constructor(
    public oidcSecurityService: OidcSecurityService,
  ) { }

  ngOnInit() {
    this.fetchConfig();
  }

  fetchConfig() {
    this.oidcSecurityService.
    this.configuration = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;
    this.userData$.subscribe(userData => {
      if (userData.userData == null) {
        console.warn('User data is null.');
        return;
      }
      debugger;
    });

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.warn('authenticated: ', isAuthenticated);
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
