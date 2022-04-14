import { LogLevel } from 'angular-auth-oidc-client';
import { Environment } from './environment.types';

export const environmentDefaults: Environment = {
  build: {
    version: 'local dev', //ci:version
    ciGitCommit: 'HEAD', //ci:gitCommit
    ciBuildDate: new Date(), //ci:buildDate
    ciBuildRef: 0, //ci:buildRef
  },

  // Relies on Angular's proxy feature when running locally via `npm`.
  // See the ../proxy/local.dev.conf.json and ../proxy/docker.dev.conf.json
  // files for more info, which can be selected between via
  // `npm run start` and `npm run start-docker`, respectively.
  backendUrls: {
    api: '/api',
    gitlabImport: '/import',
    githubImport: '/import',
    azureDevopsImport: '/import',
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
