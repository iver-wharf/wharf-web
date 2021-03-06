import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MetaService as GitLabMetaService } from 'import-gitlab-client';
import { MetaService as GitHubMetaService } from 'import-github-client';
import { MetaService as AzureDevOpsMetaService } from 'import-azuredevops-client';
import { MetaService as ApiMeta } from 'api-client';
import { Observable, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LicensesService } from '../shared/licenses/licenses.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

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
export class NavComponent implements OnInit, OnDestroy {
  projectItem: MenuItem[];
  items: MenuItem[];
  documentationItem: MenuItem[];
  loginItem: MenuItem[];
  userItem: MenuItem[];

  remoteVersionStatus = RemoteVersionStatus;

  serviceStates: RemoteVersion[] = [
    { service: ServiceName.Api, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitHub, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitLab, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderAzureDevOps, status: RemoteVersionStatus.Pending },
  ];

  private isFetchingVersions = false;
  private isDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private gitLabMetaService: GitLabMetaService,
    private gitHubMetaService: GitHubMetaService,
    private azureDevOpsMetaService: AzureDevOpsMetaService,
    private apiMeta: ApiMeta,
    private ref: ChangeDetectorRef,
    private licensesService: LicensesService,
    private authService: AuthService,
  ) {
  }

  get build() {
    return environment.build;
  }

  ngOnInit() {
    this.projectItem = [
      { label: 'PROJECTS', icon: 'pi pi-file', routerLink: ['/'] },
    ];

    this.items = [
      { label: 'BUILDS', disabled: true, icon: 'pi pi-share-alt' },
      { label: 'SETTINGS', disabled: true, icon: 'pi pi-cog' },
    ];

    this.documentationItem = [
      { label: 'DOCS', icon: 'pi pi-external-link', url: 'https://iver-wharf.github.io/#/', target: '_blank' },
    ];

    this.userItem = [];

    this.authService.profile$.subscribe({
      next: profile => {
        if (!profile.isAuthenticated) {
          return;
        }
        this.userItem = [
          { label: profile.username, icon: 'pi pi-user' },
        ];
      },
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  fetchServiceVersions() {
    if (this.isFetchingVersions) {
      return;
    }

    this.isFetchingVersions = true;

    this.updateAppVersion(ServiceName.Api, this.apiMeta.getVersion());
    this.updateAppVersion(ServiceName.ProviderGitHub, this.gitHubMetaService.githubVersionGet());
    this.updateAppVersion(ServiceName.ProviderGitLab, this.gitLabMetaService.gitlabVersionGet());
    this.updateAppVersion(ServiceName.ProviderAzureDevOps, this.azureDevOpsMetaService.azuredevopsVersionGet());
  }

  fetchLicenses() {
    this.licensesService.licenses$.subscribe({
      next: console.log,
      error: console.error,
    });
  }

  private updateAppVersion(serviceName: ServiceName, version$: Observable<VersionResponse>) {
    const state = this.serviceStates.find(s => s.service === serviceName);
    if (!state) {
      console.warn('Unknown service when fetching remote versions:', serviceName);
      return;
    }
    state.status = RemoteVersionStatus.Pending;
    version$.pipe(
      takeUntil(this.isDestroyed$),
      finalize(() => this.ref.markForCheck(),
      )).subscribe({
        next: version => {
          state.status = RemoteVersionStatus.OK;
          state.version = version.version;
        },
        error: err => {
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
      });
  }
}
