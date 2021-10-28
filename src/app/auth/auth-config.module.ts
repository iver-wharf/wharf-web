import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WharfAuthInterceptor } from './wharf-auth.interceptor';


@NgModule({
  imports: [
    AuthModule.forRoot({
      config: AuthConfigModule.defaultConfig,
    }),
  ],
  exports: [AuthModule],
  declarations: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WharfAuthInterceptor, multi: true},
  ],
})
export class AuthConfigModule {
  static defaultConfig: OpenIdConfiguration = {
    authority: 'https://login.microsoftonline.com/841df554-ef9d-48b1-bc6e-44cf8543a8fc' +
      '/v2.0/.well-known/openid-configuration',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: '01fcb3dc-7a2b-4b1c-a7d6-d7033089c779', // Application (client) ID
    scope: 'openid profile email offline_access api://wharf-internal/read api://wharf-internal/admin api://wharf-internal/deploy',
    responseType: 'id_token token',
    ignoreNonceAfterRefresh: true,
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Error,
    maxIdTokenIatOffsetAllowedInSeconds: 600,
    issValidationOff: false,
    autoUserInfo: false,
  };


}
