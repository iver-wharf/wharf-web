import { NgModule, Provider, Type } from '@angular/core';
import { ApiModule, Configuration } from 'api-client';
import { ApiModule as AzureApiModule, Configuration as AzureConfiguration } from 'import-azuredevops-client';
import { ApiModule as GitHubApiModule, Configuration as GitHubConfiguration } from 'import-github-client';
import { ApiModule as GitLabApiModule, Configuration as GitLabConfiguration } from 'import-gitlab-client';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [{
    ngModule: ApiModule,
    providers: [{
      provide: Configuration,
      useFactory: () => new Configuration({ basePath: environment.backendUrls.wharfApi })
    }],
  }],
  exports: [ApiModule],
})
export class ConfiguredApiModule { }

@NgModule({
  imports: [{
    ngModule: GitHubApiModule,
    providers: [{
      provide: GitHubConfiguration,
      useFactory: () => new GitHubConfiguration({ basePath: environment.backendUrls.providerGitHub })
    }],
  }],
  exports: [GitHubApiModule],
})
export class ConfiguredGitHubApiModule { }

@NgModule({
  imports: [{
    ngModule: GitLabApiModule,
    providers: [{
      provide: GitLabConfiguration,
      useFactory: () => new GitLabConfiguration({ basePath: environment.backendUrls.providerGitLab })
    }],
  }],
  exports: [GitLabApiModule],
})
export class ConfiguredGitLabApiModule { }

@NgModule({
  imports: [{
    ngModule: AzureApiModule,
    providers: [{
      provide: AzureApiModule,
      useFactory: () => new AzureConfiguration({ basePath: environment.backendUrls.providerAzureDevOps })
    }],
  }],
  exports: [AzureApiModule],
})
export class ConfiguredAzureDevOpsModule { }
