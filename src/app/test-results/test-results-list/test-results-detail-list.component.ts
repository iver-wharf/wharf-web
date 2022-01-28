import { Component, Input, OnInit } from '@angular/core';
import { ResponseTestResultDetail, TestResultService } from 'api-client';

@Component({
  selector: 'wh-test-results-detail-list',
  templateUrl: './test-results-detail-list.component.html',
})
export class TestResultsDetailListComponent implements OnInit {
  @Input() buildId: number;
  @Input() summaryId: number;
  details: ResponseTestResultDetail[];
  failedDetails: ResponseTestResultDetail[];
  private hasFetched: boolean;

  constructor(
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.fetchTestResultDetails();
  }

  private fetchTestResultDetails() {
    if (this.hasFetched) {
      return;
    }

    this.hasFetched = true;
    this.testResultService
      .getBuildTestResultDetailList(this.buildId, this.summaryId)
      .subscribe(details => {
        this.details = details.list;
        this.details.forEach(d => d.message = this.unescapeHtml(d.message));
        this.failedDetails = this.details.filter(d => d.status === ResponseTestResultDetail.StatusEnum.Failed);
      });
  }

  private unescapeHtml(str: string): string {
    return str?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  }
}
