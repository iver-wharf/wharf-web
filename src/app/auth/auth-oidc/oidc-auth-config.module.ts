import { NgModule } from '@angular/core';
import {
  AuthModule,
} from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: environment.oidcConfig?.enabled
        ? environment.oidcConfig
        : {
          authority: '/assets/fake-auth/.well-known/openid-configuration.json',
          redirectUrl: '/',
          clientId: 'noop',
        },
    }),
  ],
  exports: [AuthModule],
})
export class OidcAuthConfigModule { }
