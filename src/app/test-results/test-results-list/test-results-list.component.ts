import { Component, Input, OnInit } from '@angular/core';
import { TestResultService, ResponseTestResultSummary, ResponseTestResultDetail } from 'api-client';

const NO_SELECTION = -1;
@Component({
  selector: 'wh-test-results-list',
  templateUrl: './test-results-list.component.html',
})
export class TestResultsListComponent implements OnInit {
  @Input() buildId: number;
  summaries: ResponseTestResultSummary[];
  details: ResponseTestResultDetail[];
  failedDetails: ResponseTestResultDetail[];
  selectedSummaryId: number = NO_SELECTION;
  selectedDetailId: number = NO_SELECTION;

  constructor(
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.testResultService
      .getBuildAllTestResultSummaryList(this.buildId)
      .subscribe(paginatedSummaries => {
        this.summaries = paginatedSummaries.list;
      });
  }

  toggleDetails(summary: ResponseTestResultSummary): void {
    if (this.selectedSummaryId === summary.testResultSummaryId) {
      this.selectedSummaryId = NO_SELECTION;
      this.selectedDetailId = NO_SELECTION;
    } else {
      this.selectedSummaryId = summary.testResultSummaryId;
      this.selectedDetailId = NO_SELECTION;
    }

    this.testResultService
      .getBuildTestResultDetailList(summary.buildId, summary.artifactId)
      .subscribe(paginatedDetails => {
        this.details = paginatedDetails.list;
        this.failedDetails = this.details.filter(detail => detail.status === 'Failed');
      });
  }

  showDetailMessage(detail: ResponseTestResultDetail): void {
    if (this.selectedDetailId === detail.testResultDetailId) {
      this.selectedDetailId = NO_SELECTION;
    } else {
      this.selectedDetailId = detail.testResultDetailId;
    }
  }
}
