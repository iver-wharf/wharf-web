import { environmentDefaults } from './environment.default';
import { Environment } from './environment.types';

/**
 * Variables for this environment. During runtime, this is a merged combination
 * of environment.ts or environment.prod.ts, environment.default.ts, and
 * config.json.
 *
 * Warning: Due to how our Angular modules are bundled and loaded, you could
 * get into an edge case where the config.json values are not included yet.
 *
 * More specifically, config.json values are loaded and included after all
 * JavaScript files are loaded, but before any Angular code is executed.
 *
 * For example, if you have `console.log(environment.name)`:
 *
 * - in the top of a file, outside of any class definition, it will not have
 *   config.json's values included yet.
 *
 * - inside a class constructor, ngOnInit, dependency injector function call,
 *   or any other deferred function, then it will correctly have config.json's
 *   values included.
 */
export const environment: Environment = {
  ...environmentDefaults,

  name: 'dev',
  production: false,
};
