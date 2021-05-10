import { DefaultService as AzureService, MainImport } from 'import-azuredevops-client';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AzureDevOpsFormModel } from './azuredevops-form.model';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'wh-azuredevops',
  templateUrl: './azuredevops.component.html'
})
export class AzureDevOpsComponent {
  providerForm: FormGroup;

  constructor(
    public azureService: AzureService,
    private formBuilder: FormBuilder,
    private providersService: ProvidersService) {
    this.providerForm = this.formBuilder.group(new AzureDevOpsFormModel());
  }

  onSubmit() {
    const providerData: MainImport = {
      url: this.providerForm.value.url,
      token: this.providerForm.value.token,
      group: this.providerForm.value.group,
      project: this.providerForm.value.project,
      user: this.providerForm.value.user
    };

    this.azureService.azuredevopsPost(providerData)
      .pipe(
        finalize(() => this.providersService.triggerCloseForm(this.providerForm))
      )
      .subscribe();
  }
}
