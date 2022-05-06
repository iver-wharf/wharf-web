import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { CardModule } from 'primeng/card';
import { OidcForbiddenComponent } from './oidc-forbidden/oidc-forbidden.component';
import { OidcLoginComponent } from './oidc-login/oidc-login.component';
import { OidcUnauthorizedComponent } from './oidc-unauthorized/oidc-unauthorized.component';
import { AuthService } from '../auth.service';
import { OidcAuthProvider } from './oidc-auth-provider';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OidcAuthInterceptor } from './oidc-auth.interceptor';

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

    RouterModule.forChild([
      { path: 'login', component: OidcLoginComponent },
      { path: 'unauthorized', component: OidcUnauthorizedComponent },
      { path: 'forbidden', component: OidcForbiddenComponent },
    ]),
  ],
  providers: [
    OidcAuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: OidcAuthInterceptor, multi: true },
  ],
})
export class OidcAuthModule {
  constructor(
    private readonly eventService: PublicEventsService,
    authService: AuthService,
    oidcAuthProvider: OidcAuthProvider,
  ) {
    authService.register(oidcAuthProvider);
    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => {
        console.log('ConfigLoaded', config);
      });
  }
}
