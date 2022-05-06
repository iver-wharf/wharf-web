import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthProvider } from '../auth-provider';

@Injectable()
export class OidcAuthProvider implements AuthProvider {
  constructor(
    private oidcSecurityService: OidcSecurityService,
  ) {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('Authenticated: ', isAuthenticated);
    });
  }

  getName(): string {
    return 'OpenID Connect (OIDC)';
  }

  isAuthenticated(): boolean {
    return this.oidcSecurityService.isAuthenticated();
  }
}
