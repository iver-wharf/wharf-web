import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { AuthConfigModule } from './auth-config.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    ForbiddenComponent,
    UnauthorizedComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthConfigModule,
    DialogModule,
    RouterModule,
    ButtonModule,
    CardModule,
  ],
})
export class AuthModule {
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
