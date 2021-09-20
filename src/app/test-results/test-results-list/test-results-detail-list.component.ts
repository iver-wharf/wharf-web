import { Component, Input, OnInit } from '@angular/core';
import { ResponseTestResultDetail, TestResultService } from 'api-client';
import { TestResultStatus } from 'src/app/models/test-result-status';

@Component({
  selector: 'wh-test-results-detail-list',
  templateUrl: './test-results-detail-list.component.html',
})
export class TestResultsDetailListComponent implements OnInit {
  @Input() buildId: number;
  @Input() summaryId: number;
  details: ResponseTestResultDetail[];
  failedDetails: ResponseTestResultDetail[];
  private fetched: boolean;

  constructor(
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    if (!this.fetched) {
      this.testResultService
        .getBuildTestResultDetailList(this.buildId, this.summaryId)
        .subscribe(details => {
          this.details = details.list;
          this.details.forEach(d => d.message = this.removeHTMLEncodedCharacters(d.message));
          this.failedDetails = this.details.filter(d => d.status === TestResultStatus.Failed);
        });
      this.fetched = true;
    }
  }

  private removeHTMLEncodedCharacters(str: string): string {
    return str?.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }
}
