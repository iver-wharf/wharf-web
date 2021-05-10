import { Validators } from '@angular/forms';

export class GithubFormModel {
  url = ['', [Validators.required]];
  token = ['', [Validators.required]];
  group = [''];
  project = [''];
  uploadUrl = ['', [Validators.required]];
}
