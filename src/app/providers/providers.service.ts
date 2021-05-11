import { WharfProject } from 'src/app/models/main-project.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  MainImport as GitlabMainImport,
  DefaultService as GitlabService,
} from 'import-gitlab-client';
import {
  MainImport as GitHubMainImport,
  DefaultService as GitHubService,
} from 'import-github-client';
import {
  MainImport as AzureDevOpsMainImport,
  DefaultService as AzureDevOpsService,
} from 'import-azuredevops-client';
import { ProviderType } from './provider-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  formClosedSource$ = new Subject<FormGroup>();
  formClosed$ = this.formClosedSource$.asObservable();

  constructor(
    private gitlabService: GitlabService,
    private gitHubService: GitHubService,
    private azureDevOpsService: AzureDevOpsService) {
  }

  triggerCloseForm(providersForm: FormGroup) {
    this.formClosedSource$.next(providersForm);
  }

  refreshProject(project: WharfProject): Observable<any> {
    if (project.provider.name === ProviderType.GitLab.toLowerCase()) {
      const importData: GitlabMainImport = {
        url: project.provider.url,
        tokenId: project.provider.tokenId,
        group: project.groupName,
        project: project.name,
        providerId: project.provider.providerId
      };
      return this.gitlabService.gitlabPost(importData);
    } else if (project.provider.name === ProviderType.GitHub.toLowerCase()) {
      const importData: GitHubMainImport = {
        url: project.provider.url,
        tokenId: project.provider.tokenId,
        group: project.groupName,
        project: project.name,
        providerId: project.provider.providerId,
        uploadUrl: project.provider.uploadUrl,
      };
      return this.gitHubService.githubPost(importData);
    } else if (project.provider.name === ProviderType.AzureDevOps.toLowerCase()) {
      const importData: AzureDevOpsMainImport = {
        url: project.provider.url,
        tokenId: project.provider.tokenId,
        group: project.groupName,
        project: project.name,
        providerId: project.provider.providerId
      };
      return this.azureDevOpsService.azuredevopsPost(importData);
    }
  }
}
