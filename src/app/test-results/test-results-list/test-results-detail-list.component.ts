import { Component, Input, OnInit } from '@angular/core';
import { MainTestResultDetail, TestResultService } from 'api-client';
import { TestResultStatus } from 'src/app/models/test-result-status';

@Component({
  selector: 'wh-test-results-detail-list',
  templateUrl: './test-results-detail-list.component.html',
})
export class TestResultsDetailListComponent implements OnInit {
  @Input() buildId: number;
  @Input() summaryId: number;
  details: MainTestResultDetail[];
  failedDetails: MainTestResultDetail[];
  visible: boolean;

  constructor(
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.testResultService
      .buildBuildIdTestResultSummaryArtifactIdDetailGet(this.buildId, this.summaryId)
      .subscribe(details => {
        this.details = details;
        this.details.forEach(d => d.message = d.message?.replace(/&amp;/g, '&'));
        this.failedDetails = details.filter(d => d.status === TestResultStatus.Failed);
      });
  }
}
