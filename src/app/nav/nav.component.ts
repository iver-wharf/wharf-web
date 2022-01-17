import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MetaService as GitLabMetaService } from 'import-gitlab-client';
import { MetaService as GitHubMetaService } from 'import-github-client';
import { MetaService as AzureDevOpsMetaService } from 'import-azuredevops-client';
import { MetaService as ApiMeta } from 'api-client';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LicensesService } from '../shared/licenses/licenses.service';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../shared/config/config.service';

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
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private configService: ConfigService,
  ) {
  }

  get env() {
    return environment;
  }

  public ngOnInit() {
    this.projectItem = [
      { label: 'PROJECTS', icon: 'pi pi-file-o', routerLink: ['/'] },
    ];

    this.items = [
      { label: 'BUILDS', disabled: true, icon: 'pi pi-share-alt' },
      { label: 'SETTINGS', disabled: true, icon: 'pi pi-cog' },
    ];

    this.documentationItem = [
      { label: 'DOCS', icon: 'pi pi-external-link', url: 'https://iver-wharf.github.io/#/', target: '_blank' },
    ];

    this.userItem = [
      { label: 'LOGIN', icon: 'pi pi-sign-in', command: () => this.oidcSecurityService.authorize() },
      { label: 'user.name', disabled: true, icon: 'pi pi-user' },
    ];

    this.setMenuOptsAuth();
  }

  public isUsingPlaceholderOidcConfig(): Observable<boolean> {
    return this.configService.isPlaceHolderOidcConfig$;
  }

  public ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private setMenuOptsAuth(): void {
    combineLatest(this.oidcSecurityService.userData$, this.oidcSecurityService.isAuthenticated$)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(authStatus => {
        if (authStatus[1].isAuthenticated) {
          this.userItem = [
            { label: 'LOGOUT', icon: 'pi pi-sign-out', command: () => this.oidcSecurityService.logoff() },
            {
              label: authStatus[0].userData?.name,
              icon: 'pi pi-user',
              command: () => this.router.navigate(['/login']),
            },
          ];
        } else {
          this.userItem = [
            { label: 'LOGIN', icon: 'pi pi-sign-in', command: () => this.oidcSecurityService.authorize() },
            { label: 'user.name', disabled: true, icon: 'pi pi-user' },
          ];
        }
      });
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
