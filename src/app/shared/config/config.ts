import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export interface Config {
  environment: EnvironmentConfig;
  backendUrls: BackendUrlsConfig;
  oidcConfig: OpenIdConfiguration;
}

interface EnvironmentConfig {
  name: string;
  isProduction: boolean;
}

interface BackendUrlsConfig {
  api: string;
  gitlabImport: string;
  githubImport: string;
  azureDevopsImport: string;
}
