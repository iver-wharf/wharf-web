import { Validators } from '@angular/forms';

export class AzureDevOpsFormModel {
  url = ['', [Validators.required]];
  token = ['', [Validators.required]];
  group = ['', [Validators.required]];
  project = [''];
  user = ['', [Validators.required]];
}
