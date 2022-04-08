import { environmentDefaults } from './environment.default';
import { Environment } from './environment.types';

export const environment: Environment = {
  ...environmentDefaults,

  production: true,
};
