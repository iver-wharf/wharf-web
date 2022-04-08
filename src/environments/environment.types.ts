import { OpenIdConfiguration } from 'angular-auth-oidc-client';
import { environment } from './environment';

export interface Config {
  name?: string;
  production?: boolean;

  backendUrls?: BackendUrlsConfig;
  oidcConfig?: OpenIdConfiguration;
}

interface BackendUrlsConfig {
  api?: string;
  gitlabImport?: string;
  githubImport?: string;
  azureDevopsImport?: string;
}

export interface Environment extends Config {
  build: BuildConfig;
}

interface BuildConfig {
  version: string;
  ciGitCommit: string;
  ciBuildDate: Date;
  ciBuildRef: number;
}

export const fetchConfigPromise = new Promise<Config>(resolve => {
  const req = new XMLHttpRequest();
  req.open('GET', '/assets/config.json', true);
  req.onload = () => {
    if (req.status < 200 || req.status >= 300) {
      // just use default values.
      console.warn(`Non-2xx status code (${req.status} ${req.statusText}) when fetching config.json, using default environment instead.`);
      resolve(environment);
      return;
    }
    try {
      const config: Config = JSON.parse(req.responseText) || {};
      normalizeConfig(config);
      resolve(config);
    } catch (err) {
      console.warn('Failed to parse config.json, using default environment instead.', err);
      resolve(environment);
    }
  };
  req.send();
});

const normalizeConfig = (config: Config) => {
  renameFieldsCasePascalToCamel(config);

  if (typeof (config as any).environment === 'object') {
    const env = (config as any).environment;
    renameFieldsCasePascalToCamel(env);
    if (typeof env.isProduction === 'boolean') {
      config.production = env.isProduction;
    }
    if (typeof env.name === 'string') {
      config.name = env.name;
    }
  }

  if (typeof config.backendUrls === 'object') {
    renameFieldsCasePascalToCamel(config.backendUrls);
  }
};

const renameFieldsCasePascalToCamel = <Type extends object>(obj: Type) => {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }
    if (typeof key === 'string' && key.length > 0 && key[0].toLowerCase() !== key[0]) {
      const camelKey = key[0].toLowerCase() + key.substring(1);
      obj[camelKey] = obj[key];
      delete obj[key];
    }
  }
};
