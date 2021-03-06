import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { OidcAuthInterceptor } from './oidc-auth.interceptor';

const getOidcConf = () => {
  const conf = environment.oidcConfig?.enabled
    ? environment.oidcConfig
    : {
      authority: '/assets/fake-auth/.well-known/openid-configuration.json',
      redirectUrl: '/',
      clientId: 'noop',
    };
  conf.unauthorizedRoute = '/auth/unauthorized';
  conf.forbiddenRoute = '/auth/forbidden';
  return conf;
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: getOidcConf(),
    }),
  ],
  exports: [AuthModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: OidcAuthInterceptor, multi: true },
  ],
})
export class OidcAuthConfigModule { }
