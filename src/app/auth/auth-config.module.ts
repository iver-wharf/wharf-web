import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
// eslint-disable-next-line max-len
import { OpenIdConfiguration } from '../../../../angular-auth-oidc-client/projects/angular-auth-oidc-client/src/lib/config/openid-configuration';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WharfAuthInterceptor } from './wharf-auth.interceptor';


@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://login.microsoftonline.com/94999c36-9100-4153-9cbc-ddce798f5c95' +
          '/v2.0/.well-known/openid-configuration',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'bf171d26-c5df-4da7-b2e6-d30f39c11863', // Application (client) ID
        scope: 'openid profile email', //  profile email
        responseType: 'id_token token',
        ignoreNonceAfterRefresh: true,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: false,
        autoUserInfo: false,
        customParamsAuthRequest: {
          prompt: 'select_account', // login, consent
        },
      },
    }),
  ],
  exports: [AuthModule],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WharfAuthInterceptor, multi: true },
  ],
})
export class AuthConfigModule {

}
