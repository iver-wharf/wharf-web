import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GithubFormModel } from './github-form.model';
import { DefaultService as GitHubService } from 'import-github-client';
import { ProvidersService } from '../../providers.service';
import { first } from 'rxjs/operators';
import { MainImport } from 'projects/import-gitlab-client/src/model/models';

@Component({
  selector: 'wh-github',
  templateUrl: './github.component.html',
})
export class GithubComponent {
  providerForm: FormGroup;

  constructor(
    public gitHubService: GitHubService,
    private formBuilder: FormBuilder,
    private providersService: ProvidersService) {
    this.providerForm = this.formBuilder.group(new GithubFormModel());
  }

  onSubmit() {
    const providerData: MainImport = {
      url: this.providerForm.value.url,
      token: this.providerForm.value.token,
      group: this.providerForm.value.group,
      project: this.providerForm.value.project,
    };
    this.gitHubService.githubPost(providerData)
      .pipe(first())
      .subscribe(
        success => this.providersService.triggerCloseForm(this.providerForm),
        error => {/* Error gets show to screen form window does not close. */},
      );
  }
}
