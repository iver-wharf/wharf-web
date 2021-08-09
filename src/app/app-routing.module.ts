import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { BuildDetailsComponent } from './builds/build-details/build-details.component';
import { LicensesComponent } from './licenses/licenses.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'project/:projectId', component: ProjectDetailsComponent },
  { path: 'build/:projectId/:buildId', component: BuildDetailsComponent },
  { path: 'third-party-licenses', component: LicensesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
