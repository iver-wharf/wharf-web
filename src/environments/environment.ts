import { LogLevel, OpenIdConfiguration } from 'angular-auth-oidc-client';

export interface Config {
  name?: string;
  production?: boolean;

  backendUrls?: BackendUrlsConfig;
  oidcConfig?: OpenIdConfiguration;
}

interface BackendUrlsConfig {
  wharfApi?: string;
  providerGitLab?: string;
  providerGitHub?: string;
  providerAzureDevOps?: string;
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

export const environment: Environment = {
  build: {
    version: 'local dev', //ci:version
    ciGitCommit: 'HEAD', //ci:gitCommit
    ciBuildDate: new Date(), //ci:buildDate
    ciBuildRef: 0, //ci:buildRef
  },

  name: 'dev',
  production: false,

  // Relies on Angular's proxy feature when running locally via `npm`.
  // See the ../proxy/local.dev.conf.json and ../proxy/docker.dev.conf.json
  // files for more info, which can be selected between via
  // `npm run start` and `npm run start-docker`, respectively.
  backendUrls: {
    wharfApi: '/api',
    providerGitLab: '/import',
    providerGitHub: '/import',
    providerAzureDevOps: '/import',
  },

  oidcConfig: {
    authority: 'https://login.microsoftonline.com/841df554-ef9d-48b1-bc6e-44cf8543a8fc/v2.0/.well-known/openid-configuration',
    redirectUrl: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: '01fcb3dc-7a2b-4b1c-a7d6-d7033089c779',
    scope: 'openid profile email offline_access api://wharf-internal/read api://wharf-internal/admin api://wharf-internal/deploy',
    responseType: 'id_token token',
    ignoreNonceAfterRefresh: true,
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Debug,
    maxIdTokenIatOffsetAllowedInSeconds: 600,
    issValidationOff: false,
    autoUserInfo: false,
  },
};

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
      resolve(config);
    } catch (err) {
      console.warn('Failed to parse config.json, using default environment instead.', err);
      resolve(environment);
    }
  };
  req.send();
});
