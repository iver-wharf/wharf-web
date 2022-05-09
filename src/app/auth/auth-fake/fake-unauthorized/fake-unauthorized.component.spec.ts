import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeUnauthorizedComponent } from './fake-unauthorized.component';

describe('FakeUnauthorizedComponent', () => {
  let component: FakeUnauthorizedComponent;
  let fixture: ComponentFixture<FakeUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeUnauthorizedComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
