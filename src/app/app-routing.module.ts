import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { BuildDetailsComponent } from './builds/build-details/build-details.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LoginComponent } from './auth/login/login.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';


const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'project/:projectId', component: ProjectDetailsComponent },
  { path: 'build/:projectId/:buildId', component: BuildDetailsComponent },
  { path: 'third-party-licenses', component: LicensesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'forbidden', component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
