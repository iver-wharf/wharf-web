import { SplitButtonModule } from 'primeng/splitbutton';
import { ApiModule as GitlabImportApiModule, Configuration as GitlabImportConfiguration } from 'import-gitlab-client';
import { ApiModule as GitHubImportApiModule, Configuration as GitHubImportConfiguration } from 'import-github-client';
import { ApiModule as AzureImportApiModule, Configuration as AzureImportConfiguration } from 'import-azuredevops-client';
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
import { ConfigService } from '../shared/config/config.service';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';

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
    {
      ngModule: GitlabImportApiModule,
      providers: [{
        provide: GitlabImportConfiguration,
        useFactory: (configService: ConfigService) => configService.getGitlabImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
    {
      ngModule: GitHubImportApiModule,
      providers: [{
        provide: GitHubImportConfiguration,
        useFactory: (configService: ConfigService) => configService.getGitHubImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
    {
      ngModule: AzureImportApiModule,
      providers: [{
        provide: AzureImportConfiguration,
        useFactory: (configService: ConfigService) => configService.getAzureDevOpsImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
  ],
  providers: [],
  exports: [
    ProviderComponent,
  ]
})
export class ProvidersModule { }
