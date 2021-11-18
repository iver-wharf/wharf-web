import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { WharfProject } from 'src/app/models/main-project.model';
import { NgChanges } from 'src/app/shared/util/ngchanges';

const NO_DEFAULT_BRANCH_NAME = '<unknown default branch>';

@Component({
  selector: 'wh-project-details-configuration',
  templateUrl: './project-details-configuration.component.html',
})
export class ProjectDetailsConfigurationComponent implements OnChanges {
  @Output() wantToRefresh = new EventEmitter();

  @Input() project: WharfProject;
  defaultBranchName = NO_DEFAULT_BRANCH_NAME;
  missingConfiguration = true;

  ngOnChanges(changes: NgChanges<ProjectDetailsConfigurationComponent>): void {
    if (changes.project) {
      this.updateProperties();
    }
  }

  updateProperties() {
    this.defaultBranchName = this.project.branches?.find(b => b.default)?.name
      ?? NO_DEFAULT_BRANCH_NAME;

    this.missingConfiguration = !this.project.buildDefinition;
  }
}
