import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { MetaService as GitLabMetaService } from 'import-gitlab-client';
import { MetaService as GitHubMetaService } from 'import-github-client';
import { MetaService as AzureDevOpsMetaService } from 'import-azuredevops-client';
import { MetaService as ApiMeta } from 'api-client';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LicensesService } from '../shared/licenses/licenses.service';

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
  @ViewChild('versionButton') versionButton: ElementRef<HTMLButtonElement>;

  projectItem: MenuItem[];
  items: MenuItem[];
  documentationItem: MenuItem[];
  userItem: MenuItem[];

  remoteVersionStatus = RemoteVersionStatus;

  serviceStates: RemoteVersion[] = [
    { service: ServiceName.Api, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitHub, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderGitLab, status: RemoteVersionStatus.Pending },
    { service: ServiceName.ProviderAzureDevOps, status: RemoteVersionStatus.Pending },
  ];

  private isFetchingVersions = false;
  private overlayStyleMutationObserver: MutationObserver;

  constructor(
    private gitLabMetaService: GitLabMetaService,
    private gitHubMetaService: GitHubMetaService,
    private azureDevOpsMetaService: AzureDevOpsMetaService,
    private apiMeta: ApiMeta,
    private ref: ChangeDetectorRef,
    private licensesService: LicensesService,
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

    this.documentationItem = [
      { label: 'DOCS', icon: 'pi pi-external-link', url: 'https://iver-wharf.github.io/#/', target: '_blank' },
    ];

    this.userItem = [
      { label: 'user.name', disabled: true, icon: 'pi pi-user' },
    ];
  }

  ngOnDestroy() {
    this.cleanupHackyFixOverlayObserver();
  }

  onOverlayShow() {
    this.fetchServiceVersions();
    this.hackyFixOverlayPosition();
  }

  onOverlayHide() {
    this.cleanupHackyFixOverlayObserver();
  }

  fetchLicenses() {
    this.licensesService.licenses$.subscribe({
      next: console.log,
      error: console.error,
    });
  }

  private fetchServiceVersions() {
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
    version$.pipe(finalize(() => {
      this.ref.markForCheck();
    })).subscribe({
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

  private hackyFixOverlayPosition() {
    // There's a bug with PrimeNG's OverlayPanel combined with `position: fixed`
    // where the window scroll position is always added to the `top: 123px`.
    const panel = document.getElementsByClassName('version-panel-container')[0];
    if (!panel) {
      console.warn('Unable to find version overlay panel');
      return;
    }
    if (!(panel instanceof HTMLDivElement)) {
      console.warn('Expected overlay panel to be a <div>, but was not:', panel.nodeType);
      return;
    }

    // We can't update the position here because the invalid positioning is
    // applied after OverlayPanel.onShow is invoked:
    // https://github.com/primefaces/primeng/blob/12.0.0/src/app/components/overlaypanel/overlaypanel.ts#L226-L228
    this.cleanupHackyFixOverlayObserver();
    this.overlayStyleMutationObserver = new MutationObserver(m => this.onOverlayStyleMutated(panel, m));
    this.overlayStyleMutationObserver.observe(panel, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  private onOverlayStyleMutated(panel: HTMLDivElement, mutations: MutationRecord[]) {
    const btn = this.versionButton.nativeElement;
    const rect = btn.getBoundingClientRect();
    const top = Math.floor(rect.bottom) + 'px';
    if (panel.style.top !== top) {
      panel.style.top = top;
      this.cleanupHackyFixOverlayObserver(); // only need it once.
    }
  }

  private cleanupHackyFixOverlayObserver() {
    if (this.overlayStyleMutationObserver) {
      this.overlayStyleMutationObserver.disconnect();
      this.overlayStyleMutationObserver = null;
    }
  }
}
