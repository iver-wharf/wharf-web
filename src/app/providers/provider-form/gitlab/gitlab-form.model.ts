import { Validators } from '@angular/forms';
import { invalidUrlValidator } from '../../../shared/validator-functions/invalid-url-validator.directive';

export class GitlabFormModel {
  url = ['', [Validators.required, invalidUrlValidator()]];
  token = ['', [Validators.required]];
  group = [''];
  project = [''];
}
