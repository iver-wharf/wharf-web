import { NgModule } from '@angular/core';
import {
  AuthModule,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WharfAuthInterceptor } from './wharf-auth.interceptor';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: () => {
          console.log('OIDC config:', environment.oidcConfig);
          return new StsConfigStaticLoader(environment.oidcConfig);
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
export class AuthConfigModule { }
