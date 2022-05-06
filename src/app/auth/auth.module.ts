import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
  ],
})
export class AuthModule {
}
