import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FakeForbiddenComponent } from './fake-forbidden/fake-forbidden.component';
import { FakeUnauthorizedComponent } from './fake-unauthorized/fake-unauthorized.component';
import { FakeLoginComponent } from './fake-login/fake-login.component';
import { CardModule } from 'primeng/card';
import { AuthService } from '../auth.service';

@NgModule({
  declarations: [
    FakeForbiddenComponent,
    FakeUnauthorizedComponent,
    FakeLoginComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule,
    ButtonModule,
    CardModule,

    RouterModule.forChild([
      { path: 'login', component: FakeLoginComponent },
      { path: 'unauthorized', component: FakeUnauthorizedComponent },
      { path: 'forbidden', component: FakeForbiddenComponent },
    ]),
  ],
})
export class FakeAuthModule {
  constructor(
    authService: AuthService,
  ) {
    authService.setLoggedIn('FAKE USER');
  }
}
