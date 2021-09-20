import { AppUtilsService } from './../app-utils.service';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestResultsSummaryListComponent } from './test-results-list/test-results-summary-list.component';
import { ArtifactService, ProjectService } from 'projects/api-client/src';
import { ButtonModule } from 'primeng/button';
import { TestResultsSummaryListItemComponent } from './test-results-list/test-results-summary-list-item.component';
import { TestResultsDetailListComponent } from './test-results-list/test-results-detail-list.component';
import { TestResultsDetailsListItemComponent } from './test-results-list/test-results-detail-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from "primeng/accordion"

@NgModule({
  declarations: [TestResultsSummaryListComponent, TestResultsSummaryListItemComponent, TestResultsDetailListComponent, TestResultsDetailsListItemComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    AccordionModule,
  ],
  providers: [ArtifactService, ProjectService, AppUtilsService],
  exports: [TestResultsSummaryListComponent],
})
export class TestResultsModule { }
