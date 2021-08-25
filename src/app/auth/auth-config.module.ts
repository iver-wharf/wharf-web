import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://login.microsoftonline.com/94999c36-9100-4153-9cbc-ddce798f5c95' +
          '/v2.0/.well-known/openid-configuration',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'bf171d26-c5df-4da7-b2e6-d30f39c11863', // Application (client) ID
        scope: 'openid profile email',
        responseType: 'code',
        ignoreNonceAfterRefresh: true,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: false,
        autoUserInfo: true,
        customParamsAuthRequest: {
          prompt: 'select_account', // login, consent
        },
        storage: localStorage,
      },
    }),
  ],
  exports: [AuthModule],
  declarations: [],
  providers: [],
})
export class AuthConfigModule {

}
