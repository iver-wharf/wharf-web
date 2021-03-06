import { DefaultService as AzureService, MainImportBody } from 'import-azuredevops-client';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { AzureDevOpsFormModel } from './azuredevops-form.model';
import { ProvidersService } from '../../providers.service';
import { GlobalErrorHandler } from '../../../shared/error/global-error-handler';

@Component({
  selector: 'wh-azuredevops',
  templateUrl: './azuredevops.component.html',
})
export class AzureDevOpsComponent {
  providerForm: FormGroup;

  constructor(
    public azureService: AzureService,
    private formBuilder: FormBuilder,
    private providersService: ProvidersService,
    private globalErrorHandler: GlobalErrorHandler,
  ) {
    this.providerForm = this.formBuilder.group(new AzureDevOpsFormModel());
  }

  onSubmit() {
    this.providerForm.disable();
    const providerData: MainImportBody = {
      url: this.providerForm.value.url,
      token: this.providerForm.value.token,
      group: this.providerForm.value.group,
      project: this.providerForm.value.project,
      user: this.providerForm.value.user,
    };

    this.azureService.azuredevopsPost(providerData)
      .pipe(
        first(),
        finalize(() => {
          this.providerForm.enable();
        }),
      )
      .subscribe({
        next: () => {
          this.providersService.triggerCloseForm(this.providerForm);
        },
        error: err => {
          console.log(err);
          this.globalErrorHandler.handleError(err);
        },
      });
  }
}
