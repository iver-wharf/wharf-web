import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeForbiddenComponent } from './fake-forbidden.component';

describe('FakeForbiddenComponent', () => {
  let component: FakeForbiddenComponent;
  let fixture: ComponentFixture<FakeForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeForbiddenComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
