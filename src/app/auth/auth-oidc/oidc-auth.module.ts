import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { CardModule } from 'primeng/card';
import { OidcForbiddenComponent } from './oidc-forbidden/oidc-forbidden.component';
import { OidcHomeComponent } from './oidc-home/oidc-home.component';
import { OidcUnauthorizedComponent } from './oidc-unauthorized/oidc-unauthorized.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OidcAuthInterceptor } from './oidc-auth.interceptor';
import { OidcAutoLoginRoutesGuard } from './oidc-auto-login.guard';
import { OidcAuthConfigModule } from './oidc-auth-config.module';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [
    OidcForbiddenComponent,
    OidcUnauthorizedComponent,
    OidcHomeComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule,
    ButtonModule,
    CardModule,
    OidcAuthConfigModule,

    RouterModule.forChild([
      { path: '', component: OidcUnauthorizedComponent, canActivate: [AuthGuard] },
      { path: 'login', component: OidcUnauthorizedComponent, canActivate: [OidcAutoLoginRoutesGuard] },
      { path: 'unauthorized', component: OidcUnauthorizedComponent },
      { path: 'forbidden', component: OidcForbiddenComponent },
    ]),
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
