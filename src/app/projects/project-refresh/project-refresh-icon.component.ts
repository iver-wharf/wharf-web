import { Component } from '@angular/core';
import { ProjectRefreshBaseComponent } from './project-refresh-base.component';

@Component({
  template: `
    <wh-spinner-animation
      [isRefreshAnimationPlaying]="isRefreshing"
      (click)="onClick($event)"
      ></wh-spinner-animation>
  `,
  selector: 'wh-project-refresh-icon',
})
export class ProjectRefreshIconComponent extends ProjectRefreshBaseComponent {
}
