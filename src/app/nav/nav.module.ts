import { NgModule } from '@angular/core';
import { ApiModule as GithubImportApiModule, Configuration as GithubImportConfiguration } from 'import-github-client';
import { ApiModule as GitlabImportApiModule, Configuration as GitlabImportConfiguration } from 'import-gitlab-client';
import { ApiModule as AzureImportApiModule, Configuration as AzureImportConfiguration } from 'import-azuredevops-client';
import { ApiModule, Configuration as ApiConfiguration } from 'api-client';
import { NavComponent } from './nav.component';
import { ConfigService } from '../shared/config/config.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/pipes/shared.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    SharedModule,
    TooltipModule,
    {
      ngModule: GithubImportApiModule,
      providers: [{
        provide: GithubImportConfiguration,
        useFactory: (configService: ConfigService) => configService.getGitlabImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
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
      ngModule: AzureImportApiModule,
      providers: [{
        provide: AzureImportConfiguration,
        useFactory: (configService: ConfigService) => configService.getAzureDevOpsImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
    {
      ngModule: ApiModule,
      providers: [{
        provide: ApiConfiguration,
        useFactory: (configService: ConfigService) => configService.getAzureDevOpsImportConfig(),
        deps: [
          ConfigService
        ]
      }]
    },
  ],
  providers: [],
  exports: [
    NavComponent,
  ]
})
export class NavModule { }
