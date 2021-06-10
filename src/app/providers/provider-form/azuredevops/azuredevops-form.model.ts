import { Validators } from '@angular/forms';
import { invalidUrlValidator } from '../../../shared/validator-functions/invalid-url-validator.directive';

export class AzureDevOpsFormModel {
  url = ['', [Validators.required, invalidUrlValidator()]];
  token = ['', [Validators.required]];
  group = ['', [Validators.required]];
  project = [''];
  user = ['', [Validators.required]];
}
