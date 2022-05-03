import { NgModule } from '@angular/core';
import { AuthFakeModule } from './auth-fake/auth-fake.module';
import { ForbiddenComponent } from './forbidden.component';
import { LoginComponent } from './login.component';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  declarations: [
    ForbiddenComponent,
    LoginComponent,
    UnauthorizedComponent,
  ],
  imports: [
    AuthFakeModule,
  ],
})
export class AuthModule {
}
