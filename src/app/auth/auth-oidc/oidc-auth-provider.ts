import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthProvider } from '../auth-provider';

@Injectable()
export class OidcAuthProvider implements AuthProvider {
  constructor(
    private oidcSecurityService: OidcSecurityService,
  ) { }

  getName(): string {
    return 'OpenID Connect (OIDC)';
  }

  isAuthenticated(): boolean {
    this.oidcSecurityService.isAuthenticated$.subscribe({
      next: (auth) => console.log('is auth$?', auth),
    });
    return this.oidcSecurityService.isAuthenticated();
  }
}
