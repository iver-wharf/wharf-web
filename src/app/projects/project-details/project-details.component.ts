import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WharfProject } from 'src/app/models/main-project.model';
import { ProjectUtilsService } from '../project-utils.service';
import { LocalStorageProjectsService } from '../local-storage-projects.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ActionsModalStore } from '../actions-modal/actions-modal.service';
import { ProjectService } from 'api-client';
import { ActivatedRoute } from '@angular/router';

export interface ProjectFavoriteClickEvent {
  projectId: number;
}

@Component({
  selector: 'wh-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  @Output() favoriteClick = new EventEmitter<ProjectFavoriteClickEvent>();

  @ViewChild('refreshButton') refreshButton;

  project: WharfProject;
  isActionsFormVisible = false;
  editedProjectInstance: WharfProject;
  buildsTotalCount = 0;
  rowsCount = 10;
  destroyed$ = new Subject<void>();

  constructor(
    public projectUtilsService: ProjectUtilsService,
    public localStorageProjectsService: LocalStorageProjectsService,
    private notificationService: NotificationService,
    private actionsModalStore: ActionsModalStore,
    private projectService: ProjectService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.reloadProject();
  }

  reloadProject() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectService.projectProjectidGet(Number(projectId)).subscribe(project => {
      this.project = project;
      // Temporary initialization to render table, after that loadBuildsLazy handles builds fetching
      this.project.buildHistory = [];
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

  onFavoriteIconClicked(event: MouseEvent) {
    event.stopPropagation();
    this.localStorageProjectsService.handleFavoriteButtonClick(this.project.projectId);
    this.favoriteClick.emit({ projectId: this.project.projectId });
  }
}
