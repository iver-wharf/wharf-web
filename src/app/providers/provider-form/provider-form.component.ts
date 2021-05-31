import { Component, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { ProviderType } from '../provider-type.enum';

@Component({
  selector: 'wh-provider-form',
  templateUrl: './provider-form.component.html',
})
export class ProviderFormComponent implements OnChanges {
  @Input() selectedProvider: string;
  @ViewChild('GitLab') gitlab: TemplateRef<any>;
  @ViewChild('GitHub') github: TemplateRef<any>;
  @ViewChild('AzureDevOps') azuredevops: TemplateRef<any>;

  selectedProviderTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnChanges() {
    if (this.selectedProvider === ProviderType.GitLab) {
      this.selectedProviderTemplate = this.gitlab;
    }
    if (this.selectedProvider === ProviderType.GitHub) {
      this.selectedProviderTemplate = this.github;
    }
    if (this.selectedProvider === ProviderType.AzureDevOps) {
      this.selectedProviderTemplate = this.azuredevops;
    }
  }
}
