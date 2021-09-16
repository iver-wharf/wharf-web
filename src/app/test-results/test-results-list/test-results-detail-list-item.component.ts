import { Component, Input } from '@angular/core';
import { MainTestResultDetail } from 'api-client';

@Component({
  selector: 'wh-test-results-detail-list-item',
  templateUrl: './test-results-detail-list-item.component.html',
})
export class TestResultsDetailsListItemComponent {
  @Input() detail: MainTestResultDetail;
  visible: boolean;

  constructor() { }
}
