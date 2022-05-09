import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OidcForbiddenComponent } from './oidc-forbidden/oidc-forbidden.component';
import { OidcHomeComponent } from './oidc-home/oidc-home.component';
import { OidcUnauthorizedComponent } from './oidc-unauthorized/oidc-unauthorized.component';
import { OidcAutoLoginRoutesGuard } from './oidc-auto-login.guard';
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

    RouterModule.forChild([
      { path: '', component: OidcHomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: OidcUnauthorizedComponent, canActivate: [OidcAutoLoginRoutesGuard] },
      { path: 'unauthorized', component: OidcUnauthorizedComponent },
      { path: 'forbidden', component: OidcForbiddenComponent },
    ]),
  ],
})
export class OidcAuthModule { }
