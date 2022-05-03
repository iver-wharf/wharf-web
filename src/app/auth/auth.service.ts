import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  hello() {
    return 'auth-svc: oidc enabled? ' + environment.oidcConfig?.enabled;
  }
}
