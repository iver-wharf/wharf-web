import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcUnauthorizedComponent } from './oidc-unauthorized.component';

describe('OidcUnauthorizedComponent', () => {
  let component: OidcUnauthorizedComponent;
  let fixture: ComponentFixture<OidcUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OidcUnauthorizedComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
