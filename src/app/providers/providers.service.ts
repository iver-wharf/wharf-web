import { WharfProject } from 'src/app/models/main-project.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  DefaultService as GitlabService,
} from 'import-gitlab-client';
import {
  DefaultService as GitHubService,
} from 'import-github-client';
import {
  DefaultService as AzureDevOpsService,
} from 'import-azuredevops-client';
import { ProviderType } from './provider-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  formClosedSource$ = new Subject<FormGroup>();
  formClosed$ = this.formClosedSource$.asObservable();

  constructor(
    private gitlabService: GitlabService,
    private gitHubService: GitHubService,
    private azureDevOpsService: AzureDevOpsService,
  ) { }

  triggerCloseForm(providersForm: FormGroup) {
    this.formClosedSource$.next(providersForm);
  }

  refreshProject(project: WharfProject): Observable<any> {
    switch (project.provider.name) {
      case ProviderType.GitLab.toLowerCase():
        return this.gitlabService.gitlabPost({
          projectId: project.projectId,
          url: project.provider.url,
          tokenId: project.provider.tokenId,
          group: project.groupName,
          project: project.name,
          providerId: project.provider.providerId,
        });
      case ProviderType.GitHub.toLowerCase():
        return this.gitHubService.githubPost({
          projectId: project.projectId,
          url: project.provider.url,
          tokenId: project.provider.tokenId,
          group: project.groupName,
          project: project.name,
          providerId: project.provider.providerId,
        });
      case ProviderType.AzureDevOps.toLowerCase():
        return this.azureDevOpsService.azuredevopsPost({
          projectId: project.projectId,
          url: project.provider.url,
          tokenId: project.provider.tokenId,
          group: project.groupName,
          project: project.name,
          providerId: project.provider.providerId,
        });
    }
  }
}
