import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { BuildDetailsComponent } from './builds/build-details/build-details.component';
import { LicensesComponent } from './licenses/licenses.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: ProjectListComponent },
      { path: 'project/:projectId', component: ProjectDetailsComponent },
      { path: 'build/:projectId/:buildId', component: BuildDetailsComponent },
      { path: 'third-party-licenses', component: LicensesComponent },
      //{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ],
  },
  {
    path: 'auth', loadChildren: async () => {
      if (environment.oidcConfig?.enabled) {
        return (await import('./auth/auth-oidc/auth-oidc.module')).AuthOidcModule;
      } else {
        return (await import('./auth/auth-fake/auth-fake.module')).AuthFakeModule;
      }
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
