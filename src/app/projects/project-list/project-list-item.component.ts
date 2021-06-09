import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { WharfProject } from 'src/app/models/main-project.model';
import { NgChanges } from 'src/app/shared/util/ngchanges';
import { LocalStorageProjectsService } from '../local-storage-projects.service';
import { ProjectRefreshedEvent } from '../project-refresh';
import { ProjectUtilsService } from '../project-utils.service';

export interface ProjectFavoriteClickEvent {
  projectId: number;
}

@Component({
  selector: 'wh-project-list-item',
  templateUrl: './project-list-item.component.html',
})
export class ProjectListItemComponent implements OnChanges {
  @Input() project: WharfProject;

  @Output() refreshed = new EventEmitter<ProjectRefreshedEvent>();
  @Output() favoriteClick = new EventEmitter<ProjectFavoriteClickEvent>();

  isRefreshAnimationPlaying: boolean;
  providerHostname: string;

  constructor(
    public localStorageProjectsService: LocalStorageProjectsService,
    public projectUtilsService: ProjectUtilsService,
  ) { }

  ngOnChanges(changes: NgChanges<ProjectListItemComponent>): void {
    if (changes.project && this.project) {
      this.providerHostname = this.project.provider?.url
        ? new URL(this.project.provider.url).hostname
        : null;
    }
  }

  onFavoriteIconClicked(event: MouseEvent) {
    event.stopPropagation();
    this.localStorageProjectsService.handleFavoriteButtonClick(this.project.projectId);
    this.favoriteClick.emit({ projectId: this.project.projectId });
  }
}
