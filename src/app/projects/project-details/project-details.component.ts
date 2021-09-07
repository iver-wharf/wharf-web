import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WharfProject } from 'src/app/models/main-project.model';
import { ProjectUtilsService } from '../project-utils.service';
import { LocalStorageProjectsService } from '../local-storage-projects.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ActionsModalStore } from '../actions-modal/actions-modal.service';
import { ProjectService } from 'api-client';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

const enum Tabs {
  Builds = 0,
  Configuration,
  Schedule,
}

@Component({
  selector: 'wh-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild('refreshButton') refreshButton;

  project: WharfProject;
  isActionsFormVisible = false;
  editedProjectInstance: WharfProject;
  buildsTotalCount = 0;
  rowsCount = 10;
  destroyed$ = new Subject<void>();
  activeTabIndex = 0;

  constructor(
    public projectUtilsService: ProjectUtilsService,
    public localStorageProjectsService: LocalStorageProjectsService,
    private notificationService: NotificationService,
    private actionsModalStore: ActionsModalStore,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.reloadProject();
    this.updateTitle();
  }

  onTabChanged() {
    this.updateTitle();
  }

  reloadProject() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectService.projectProjectidGet(Number(projectId)).subscribe(project => {
      this.project = project;
      // Temporary initialization to render table, after that loadBuildsLazy handles builds fetching
      this.project.buildHistory = [];
      this.updateTitle();
    });

    this.actionsModalStore.isVisible$.pipe(takeUntil(this.destroyed$)).subscribe(x => this.isActionsFormVisible = x);
  }

  refreshProject() {
    if (this.refreshButton) {
      this.refreshButton.refreshProject();
    } else {
      console.warn('There\'s no refresh button available!');
    }
  }

  copyElemContentToClipboard(elem: HTMLElement) {
    const range = document.createRange();
    range.selectNode(elem);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    if (document.execCommand('copy')) {
      this.notificationService.showInfo('Copied to clipboard');
    } else {
      this.notificationService.showWarning('Failed to copy to clipboard');
    }
    selection.removeAllRanges();
  }

  private updateTitle() {
    if (!this.project) {
      this.titleService.setTitle(`Loading... - Wharf`);
    } else if (this.activeTabIndex === Tabs.Builds) {
      this.titleService.setTitle(`${this.project.name} - Wharf`);
    } else if (this.activeTabIndex === Tabs.Configuration) {
      this.titleService.setTitle(`Configuration - ${this.project.name} - Wharf`);
    } else if (this.activeTabIndex === Tabs.Schedule) {
      this.titleService.setTitle(`Schedule - ${this.project.name} - Wharf`);
    }
  }
}
