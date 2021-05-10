import { Validators } from '@angular/forms';

export class GitlabFormModel {
  url = ['', [Validators.required]];
  token = ['', [Validators.required]];
  group = [''];
  project = [''];
}
