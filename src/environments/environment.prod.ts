import { environmentDefaults } from './environment.default';
import { Environment } from './environment.types';

/**
 * This file replaces environment.ts in production builds (via angular.json),
 * which is selected when running `npm run build-prod`, such as in the Dockerfile.
 *
 * In regular `npm start` builds, this file is unused.
 */

export const environment: Environment = {
  ...environmentDefaults,

  production: true,
};
