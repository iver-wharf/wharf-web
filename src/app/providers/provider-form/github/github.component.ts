import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GithubFormModel } from './github-form.model';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'wh-github',
  templateUrl: './github.component.html',
})
export class GithubComponent {
  providerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private providersService: ProvidersService) {
    this.providerForm = this.formBuilder.group(new GithubFormModel());
  }

  onSubmit() {
    console.warn('Not implemented');
    this.providersService.triggerCloseForm(this.providerForm);
  }
}
