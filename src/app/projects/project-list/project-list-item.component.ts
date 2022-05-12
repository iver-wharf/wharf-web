import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { WharfProject } from 'src/app/models/main-project.model';
import { NgChanges } from 'src/app/shared/util/ngchanges';
import { LocalStorageProjectsService } from '../local-storage-projects.service';
import { ProjectFavoriteClickEvent } from '../project-favorite/project-favorite-button.component';
import { ProjectRefreshedEvent } from '../project-refresh';
import { ProjectUtilsService } from '../project-utils.service';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'wh-project-list-item',
  templateUrl: './project-list-item.component.html',
})
export class ProjectListItemComponent implements OnInit, OnChanges {
  @Input() project: WharfProject;

  @Output() refreshed = new EventEmitter<ProjectRefreshedEvent>();
  @Output() favoriteClick = new EventEmitter<ProjectFavoriteClickEvent>();

  isRefreshAnimationPlaying: boolean;
  providerHostname: string;
  menuItems: MenuItem[];
  noStagesTooltip;

  constructor(
    public localStorageProjectsService: LocalStorageProjectsService,
    public projectUtilsService: ProjectUtilsService,
  ) { }

  ngOnInit() {
    this.menuItems = this.projectUtilsService.getActionsMenuItems(this.project);
    if (!this.menuItems.length) {
      this.noStagesTooltip = 'There are no stages for this project!';
    }
  }

  ngOnChanges(changes: NgChanges<ProjectListItemComponent>): void {
    if (changes.project && this.project?.provider?.url) {
      try {
        this.providerHostname = new URL(this.project.provider.url).hostname;
      } catch (e) {
        this.providerHostname = this.project.provider.url;
      }
    }
  }

  onFavoriteClick(event: ProjectFavoriteClickEvent) {
    this.favoriteClick.emit(event);
  }
}
