import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, fetchConfigPromise } from './environments/environment';

fetchConfigPromise.then(config => {
  environment.name = config.name ?? environment.name;
  environment.production = config.production ?? environment.production;
  environment.backendUrls = {
    ...environment.backendUrls,
    ...config.backendUrls ?? {},
  };
  environment.oidcConfig = {
    ...environment.oidcConfig,
    ...config.oidcConfig ?? {},
  };

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
