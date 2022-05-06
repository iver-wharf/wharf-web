import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth-provider';

@Injectable()
export class OidcAuthProvider implements AuthProvider {
  getName(): string {
    return 'OpenID Connect (OIDC)';
  }

  isAuthenticated(): boolean {
    console.log('oidc is auth?');
    return false;
  }
}
