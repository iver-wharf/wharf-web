import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { fetchConfigPromise } from './environments/environment.types';

const copyFields = <Type>(source: Type, target: Type) => {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};

fetchConfigPromise.then(config => {
  environment.name = config.name ?? environment.name;
  environment.production = config.production ?? environment.production;
  // Edit the existing JS objects instead of creating new ones, in case some
  // code has reference to the objects before the config.json was fetched.
  copyFields(config.backendUrls ?? {}, environment.backendUrls);
  copyFields(config.oidcConfig ?? {}, environment.oidcConfig);

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
