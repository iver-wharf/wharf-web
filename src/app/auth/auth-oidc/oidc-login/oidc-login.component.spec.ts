import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcLoginComponent } from './oidc-login.component';

describe('OidcLoginComponent', () => {
  let component: OidcLoginComponent;
  let fixture: ComponentFixture<OidcLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OidcLoginComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
