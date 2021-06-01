import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MetaService as GitLabMetaService } from 'import-gitlab-client';
import { MetaService as GitHubMetaService } from 'import-github-client';
import { MetaService as AzureDevOpsMetaService } from 'import-azuredevops-client';
import { MetaService as ApiMeta } from 'api-client';
import { Observable } from 'rxjs';
import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';

enum RemoteVersionStatus {
  Pending,
  OK,
  NotFound,
  Error,
}

interface RemoteVersion {
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

  private serviceStates = new Map<ServiceName, RemoteVersion>([
    [ServiceName.Api, { status: RemoteVersionStatus.Pending }],
    [ServiceName.ProviderGitHub, { status: RemoteVersionStatus.Pending }],
    [ServiceName.ProviderGitLab, { status: RemoteVersionStatus.Pending }],
    [ServiceName.ProviderAzureDevOps, { status: RemoteVersionStatus.Pending }],
  ]);

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

  getServiceStates(): KeyValue<ServiceName, RemoteVersion>[] {
    return Array.from(this.serviceStates.entries()).map(([name, state]) => ({ key: name, value: state }));
  }

  serviceStateTrackBy(index: number, pair: KeyValue<ServiceName, RemoteVersion>): string {
    return pair.key;
  }

  fetchServiceVersions() {
    if (this.isFetchingVersions) {
      return;
    }

    this.isFetchingVersions = true;
    console.log('Started fetching versions...');

    this.updateAppVersion(ServiceName.Api, this.apiMeta.versionGet());
    this.updateAppVersion(ServiceName.ProviderGitHub, this.gitHubMetaService.githubVersionGet());
    this.updateAppVersion(ServiceName.ProviderGitLab, this.gitLabMetaService.gitlabVersionGet());
    this.updateAppVersion(ServiceName.ProviderAzureDevOps, this.azureDevOpsMetaService.azuredevopsVersionGet());
  }

  private updateAppVersion(serviceName: ServiceName, version$: Observable<VersionResponse>) {
    const state = this.serviceStates.get(serviceName);
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
