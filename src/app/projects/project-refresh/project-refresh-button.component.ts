import { Component, Input } from '@angular/core';
import { ProjectRefreshBaseComponent } from './project-refresh-base.component';

@Component({
  templateUrl: './project-refresh-button.component.html',
  selector: 'wh-project-refresh-button',
})
export class ProjectRefreshButtonComponent extends ProjectRefreshBaseComponent {
  @Input() label = 'Refresh';
}
