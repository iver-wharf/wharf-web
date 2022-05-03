import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcForbiddenComponent } from './oidc-forbidden.component';

describe('OidcForbiddenComponent', () => {
  let component: OidcForbiddenComponent;
  let fixture: ComponentFixture<OidcForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OidcForbiddenComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
