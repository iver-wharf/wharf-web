import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MetaService as GitLabMetaService } from 'import-gitlab-client';
import { MetaService as GitHubMetaService } from 'import-github-client';
import { MetaService as AzureDevOpsMetaService } from 'import-azuredevops-client';
import { MetaService as ApiMeta } from 'api-client';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

enum RemoteVersionStatus {
  Pending,
  OK,
  NotFound,
  Error,
}

interface RemoteVersion {
  service: ServiceName;
  version?: string;
  status: RemoteVersionStatus;
  error?: string;
}

interface VersionResponse {
  version?: string;
}

enum ServiceName {
  Api = 'wharf-api',
  ProviderGitHub = 'wharf-provider-github',
  ProviderGitLab = 'wharf-provider-gitlab',
  ProviderAzureDevOps = 'wharf-provider-azuredevops',
}

@Component({
  selector: 'wh-app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  projectItem: MenuItem[];
  items: MenuItem[];
  userItem: MenuItem[];

  remoteVersionStatus = RemoteVersionStatus;

  serviceStates: RemoteVersion[] = [
    { service: ServiceName.Api, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitHub, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitLab, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderAzureDevOps, status: RemoteVersionStatus.Pending },
  ];

  private isFetchingVersions = false;

  constructor(
    private gitLabMetaService: GitLabMetaService,
    private gitHubMetaService: GitHubMetaService,
    private azureDevOpsMetaService: AzureDevOpsMetaService,
    private apiMeta: ApiMeta,
    private ref: ChangeDetectorRef,
  ) { }

  get env() {
    return environment;
  }

  ngOnInit() {
    this.projectItem = [
      { label: 'PROJECTS', icon: 'pi pi-file-o', routerLink: ['/'] },
    ];

    this.items = [
      { label: 'BUILDS', disabled: true, icon: 'pi pi-share-alt' },
      { label: 'SETTINGS', disabled: true, icon: 'pi pi-cog' },
    ];

    this.userItem = [
      { label: 'user.name', disabled: true, icon: 'pi pi-user' },
    ];
  }

  fetchServiceVersions() {
    if (this.isFetchingVersions) {
      return;
    }

    this.isFetchingVersions = true;

    this.updateAppVersion(ServiceName.Api, this.apiMeta.versionGet());
    this.updateAppVersion(ServiceName.ProviderGitHub, this.gitHubMetaService.githubVersionGet());
    this.updateAppVersion(ServiceName.ProviderGitLab, this.gitLabMetaService.gitlabVersionGet());
    this.updateAppVersion(ServiceName.ProviderAzureDevOps, this.azureDevOpsMetaService.azuredevopsVersionGet());
  }

  private updateAppVersion(serviceName: ServiceName, version$: Observable<VersionResponse>) {
    const state = this.serviceStates.find(s => s.service === serviceName);
    if (!state) {
      console.warn('Unknown service when fetching remote versions:', serviceName);
      return;
    }
    state.status = RemoteVersionStatus.Pending;
    version$.subscribe(
      version => {
        state.status = RemoteVersionStatus.OK;
        state.version = version.version;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            state.status = RemoteVersionStatus.NotFound;
          } else {
            state.status = RemoteVersionStatus.Error;
            state.error = err.message;
          }
        } else {
          console.warn('Unknown error fetching version for', serviceName, err);
          state.status = RemoteVersionStatus.Error;
          state.error = `Unknown error: ${err}`;
        }
      },
      () => {
        this.ref.markForCheck();
      }
    );
  }
}
