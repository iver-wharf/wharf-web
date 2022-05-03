import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthFakeModule } from './auth-fake/auth-fake.module';
import { AuthOidcModule } from './auth-oidc/auth-oidc.module';
import { ForbiddenComponent } from './forbidden.component';
import { LoginComponent } from './login.component';
import { UnauthorizedComponent } from './unauthorized.component';

console.log('decl: oidc enabled?', environment.oidcConfig?.enabled);

const module = () => {
  console.log('mod-init: oidc enabled?', environment.oidcConfig?.enabled);
  return environment.oidcConfig?.enabled ? AuthOidcModule : AuthFakeModule;
};

@NgModule({
  declarations: [
    ForbiddenComponent,
    LoginComponent,
    UnauthorizedComponent,
  ],
  imports: [
    // TODO: conditionally load AuthFakeModule or AuthOidcModule
    // If we used environment here directly, then the config.json would
    // not be included...
    //environment.oidcConfig?.enabled ? AuthOidcModule : AuthFakeModule,
    module(),

    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'forbidden', component: ForbiddenComponent },
    ]),
  ],
})
export class AuthModule {
  constructor() {
    console.log('ctor: oidc enabled?', environment.oidcConfig?.enabled);
  }
}
