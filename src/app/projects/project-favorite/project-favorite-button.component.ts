import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageProjectsService } from '../local-storage-projects.service';

export interface ProjectFavoriteClickEvent {
  projectId: number;
}

@Component({
  selector: 'wh-project-favorite-button',
  templateUrl: './project-favorite-button.component.html',
})
export class ProjectFavoriteButtonComponent {
  @Input() projectId: number;

  @Output() favoriteClick = new EventEmitter<ProjectFavoriteClickEvent>();

  constructor(
    public localStorageProjectsService: LocalStorageProjectsService,
  ) { }

  onFavoriteIconClicked(event: MouseEvent) {
    event.stopPropagation();
    this.localStorageProjectsService.handleFavoriteButtonClick(this.projectId);
    this.favoriteClick.emit({ projectId: this.projectId });
  }

  getClass() {
    if (this.localStorageProjectsService.projectIsFavorite(this.projectId)) {
      return 'pi pi-star';
    }
    return 'pi pi-star-o';
  }
}
