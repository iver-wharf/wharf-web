export interface Config {
  environment: EnvironmentConfig;
  backendUrls: BackendUrlsConfig;
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
