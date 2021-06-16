import { TestBed } from '@angular/core/testing';

import { TabviewIndexTrackerService } from './tabview-index-tracker.service';

describe('TabviewIndexTrackerService', () => {
  let service: TabviewIndexTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabviewIndexTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
