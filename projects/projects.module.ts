import { NgModule, Provider, Type } from '@angular/core';
import { ApiModule, Configuration } from 'api-client';
import { ApiModule as AzureApiModule, Configuration as AzureConfiguration } from 'import-azuredevops-client';
import { ApiModule as GitHubApiModule, Configuration as GitHubConfiguration } from 'import-github-client';
import { ApiModule as GitLabApiModule, Configuration as GitLabConfiguration } from 'import-gitlab-client';
import { ConfigService } from '../src/app/shared/config/config.service';

const apiProviderWithConfig = <TConfig>(
  configType: Type<TConfig>,
  configFactory: (configService: ConfigService) => TConfig,
): Provider =>
({
  provide: configType,
  useFactory: configFactory,
  deps: [ConfigService]
});

@NgModule({
  imports: [{
    ngModule: ApiModule,
    providers: [apiProviderWithConfig(Configuration, c => c.getApiConfig())],
  }],
  exports: [ApiModule],
})
export class ConfiguredApiModule { }

@NgModule({
  imports: [{
    ngModule: GitHubApiModule,
    providers: [apiProviderWithConfig(GitHubConfiguration, c => c.getApiConfig())],
  }],
  exports: [GitHubApiModule],
})
export class ConfiguredGitHubApiModule { }

@NgModule({
  imports: [{
    ngModule: GitLabApiModule,
    providers: [apiProviderWithConfig(GitLabConfiguration, c => c.getApiConfig())],
  }],
  exports: [GitLabApiModule],
})
export class ConfiguredGitLabApiModule { }

@NgModule({
  imports: [{
    ngModule: AzureApiModule,
    providers: [apiProviderWithConfig(AzureConfiguration, c => c.getApiConfig())],
  }],
  exports: [AzureApiModule],
})
export class ConfiguredAzureDevOpsModule { }
