import { Injectable } from '@angular/core';
import { Config } from './config';
import { Configuration } from 'api-client';
import { Configuration as GitlabConfiguration } from 'import-gitlab-client';
import { Configuration as AzureDevOpsConfiguration } from 'import-azuredevops-client';

/**
 * Backward compatability to allow config values to start with an uppercase or lowercase.
 * Starting with v2.0.0, we will only support config values starting with lowercase.
 *
 * @deprecated Will be removed starting v2.0.0
 * @param obj Object to get field from
 * @param key Object key name
 * @returns Value from item
 */
export const upGet = <T, K extends keyof T & string>(obj: T, key: K): T[K] =>
  obj[key] ?? obj[key[0].toUpperCase() + key.substr(1)];

/**
 * Backward compatability to recursively lowercase first letter in all object keys.
 * Starting with v2.0.0, we will only support config values starting with lowercase,
 * so this function will be removed by then.
 *
 * @deprecated Will be removed starting v2.0.0
 * @param obj Object to do a deep clone on
 * @returns Same object, but where all fields has been forcefully lowercased.
 */
export const lowClone = <T>(obj: T): T => {
  const clone = {} as T;
  Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let val = obj[key];
      if (typeof obj[key] == 'object') {
        val = lowClone(val);
      }
      clone[key[0].toLowerCase() + key.substr(1)] = val;
    }
  };
  return clone;
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config;

  constructor() { }

  setConfig(config: Config): void {
    this.config = lowClone(config);
  }

  getConfig(): Config {
    return this.config;
  }

  getApiConfig(): Configuration {
    return new Configuration({
      basePath: upGet(upGet(this.config, 'backendUrls'), 'api')
    });
  }

  getGitlabImportConfig(): GitlabConfiguration {
    return new GitlabConfiguration({
      basePath: upGet(upGet(this.config, 'backendUrls'), 'gitlabImport')
    });
  }

  getGitHubImportConfig(): GitlabConfiguration {
    return new GitlabConfiguration({
      basePath: upGet(upGet(this.config, 'backendUrls'), 'githubImport')
    });
  }

  getAzureDevOpsImportConfig(): AzureDevOpsConfiguration {
    return new AzureDevOpsConfiguration({
      basePath: upGet(upGet(this.config, 'backendUrls'), 'azureDevopsImport')
    });
  }
}
