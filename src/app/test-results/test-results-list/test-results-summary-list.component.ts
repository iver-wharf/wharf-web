import { Component, Input } from '@angular/core';
import { ResponseBuild } from 'api-client';

@Component({
  selector: 'wh-test-results-summary-list',
  templateUrl: './test-results-summary-list.component.html',
})
export class TestResultsSummaryListComponent {
  @Input() build: ResponseBuild;

  constructor() { }
}
