import { Environment } from 'src/app/models/environment.model';

export class ExcludedEnvironment extends Environment {
  disabledReason?: string;
}
