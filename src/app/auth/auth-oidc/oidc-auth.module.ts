import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { CardModule } from 'primeng/card';
import { OidcForbiddenComponent } from './oidc-forbidden/oidc-forbidden.component';
import { OidcLoginComponent } from './oidc-login/oidc-login.component';
import { OidcUnauthorizedComponent } from './oidc-unauthorized/oidc-unauthorized.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OidcAuthInterceptor } from './oidc-auth.interceptor';
import { OidcAutoLoginRoutesGuard } from './oidc-auto-login.guard';
import { OidcAuthConfigModule } from './oidc-auth-config.module';
import { AuthService } from '../auth.service';

@NgModule({
  declarations: [
    OidcForbiddenComponent,
    OidcUnauthorizedComponent,
    OidcLoginComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule,
    ButtonModule,
    CardModule,
    OidcAuthConfigModule,

    RouterModule.forChild([{
      path: '',
      canActivate: [OidcAutoLoginRoutesGuard],
      children: [
        { path: 'login', component: OidcLoginComponent },
        { path: 'unauthorized', component: OidcUnauthorizedComponent },
        { path: 'forbidden', component: OidcForbiddenComponent },
      ],
    }]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: OidcAuthInterceptor, multi: true },
  ],
})
export class OidcAuthModule {
  constructor(
    private readonly eventService: PublicEventsService,
  ) {
    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => {
        console.log('ConfigLoaded', config);
      });
  }
}
