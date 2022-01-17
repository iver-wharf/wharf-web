import { NgModule } from '@angular/core';
import {
  AuthModule,
  StsConfigHttpLoader,
  StsConfigLoader,
} from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WharfAuthInterceptor } from './wharf-auth.interceptor';
import { ConfigService } from '../shared/config/config.service';

const authFactory = (configService: ConfigService) => new StsConfigHttpLoader(configService.getOidcConfig$());

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: authFactory,
        deps: [ConfigService],
      },
    }),
  ],
  exports: [AuthModule],
  declarations: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WharfAuthInterceptor, multi: true},
  ],
})
export class AuthConfigModule {}
