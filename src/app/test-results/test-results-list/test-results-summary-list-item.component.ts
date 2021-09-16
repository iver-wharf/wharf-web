import { Component, Input } from '@angular/core';
import { MainTestResultSummary } from 'api-client';

@Component({
  selector: 'wh-test-results-summary-list-item',
  templateUrl: './test-results-summary-list-item.component.html',
})
export class TestResultsSummaryListItemComponent {
  @Input() summary: MainTestResultSummary;
  visible: boolean;

  private numberFormat = new Intl.NumberFormat('en-US');

  constructor() { }

  numberWithCommas(num: number) {
    return this.numberFormat.format(num);
  }
}
