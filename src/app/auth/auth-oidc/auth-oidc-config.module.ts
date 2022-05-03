import { NgModule } from '@angular/core';
import {
  AuthModule,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthOidcInterceptor } from './auth-oidc.interceptor';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: () => new StsConfigStaticLoader(environment.oidcConfig),
      },
    }),
  ],
  exports: [AuthModule],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthOidcInterceptor, multi: true },
  ],
})
export class AuthConfigModule { }
