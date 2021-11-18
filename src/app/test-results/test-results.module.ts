import { AppUtilsService } from './../app-utils.service';

import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultsListComponent } from './test-results-list/test-results-list.component';
import { ArtifactService, ProjectService } from 'projects/api-client/src';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TestResultsListComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  providers: [ArtifactService, ProjectService, AppUtilsService],
  exports: [TestResultsListComponent],
})
export class TestResultsModule { }
