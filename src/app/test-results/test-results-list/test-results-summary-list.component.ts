import { Component, Input, OnInit } from '@angular/core';
import { MainTestResultSummary, TestResultService } from 'api-client';

@Component({
  selector: 'wh-test-results-summary-list',
  templateUrl: './test-results-summary-list.component.html',
})
export class TestResultsSummaryListComponent implements OnInit {
  @Input() buildId: number;
  summaries: MainTestResultSummary[];

  constructor(
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.testResultService
      .buildBuildIdTestResultSummaryGet(this.buildId)
      .subscribe(summaries => {
        this.summaries = summaries;
      });
  }
}
