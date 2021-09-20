import { Component, Input } from '@angular/core';
import { ResponseTestResultSummary } from 'api-client';

@Component({
  selector: 'wh-test-results-summary-list-item',
  templateUrl: './test-results-summary-list-item.component.html',
})
export class TestResultsSummaryListItemComponent {
  @Input() summary: ResponseTestResultSummary;

  constructor() { }
}
