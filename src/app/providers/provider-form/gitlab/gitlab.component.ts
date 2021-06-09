import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainImport } from 'projects/import-gitlab-client/src/model/models';
import { finalize } from 'rxjs/operators';
import { DefaultService as GitlabService } from 'import-gitlab-client';
import { ProvidersService } from '../../providers.service';
import { GitlabFormModel } from './gitlab-form.model';

@Component({
  selector: 'wh-gitlab',
  templateUrl: './gitlab.component.html',
})
export class GitlabComponent {
  providerForm: FormGroup;

  constructor(
    public gitlabService: GitlabService,
    private formBuilder: FormBuilder,
    private providersService: ProvidersService) {
    this.providerForm = this.formBuilder.group(new GitlabFormModel());
  }

  onSubmit() {
    const providerData: MainImport = {
      url: this.providerForm.value.url,
      token: this.providerForm.value.token,
      group: this.providerForm.value.group,
      project: this.providerForm.value.project,
    };

    this.gitlabService.gitlabPost(providerData)
      .pipe(
        finalize(() => this.providersService.triggerCloseForm(this.providerForm)),
      )
      .subscribe();
  }
}

