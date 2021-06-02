import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './provider/provider.component';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GitlabComponent } from './provider-form/gitlab/gitlab.component';
import { GithubComponent } from './provider-form/github/github.component';
import { AzureDevOpsComponent } from './provider-form/azuredevops/azuredevops.component';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { ConfiguredAzureDevOpsModule, ConfiguredGitHubApiModule, ConfiguredGitLabApiModule } from 'projects/projects.module';

@NgModule({
  declarations: [
    AzureDevOpsComponent,
    GithubComponent,
    GitlabComponent,
    ProviderComponent,
    ProviderFormComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MenuModule,
    ReactiveFormsModule,
    SplitButtonModule,
    ConfiguredAzureDevOpsModule,
    ConfiguredGitHubApiModule,
    ConfiguredGitLabApiModule,
  ],
  providers: [],
  exports: [
    ProviderComponent,
  ]
})
export class ProvidersModule { }
