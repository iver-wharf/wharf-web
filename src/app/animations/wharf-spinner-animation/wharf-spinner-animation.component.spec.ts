import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WharfSpinnerAnimationComponent } from './wharf-spinner-animation.component';

let component: WharfSpinnerAnimationComponent;
let fixture: ComponentFixture<WharfSpinnerAnimationComponent>;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [WharfSpinnerAnimationComponent],
  });
  fixture = TestBed.createComponent(WharfSpinnerAnimationComponent);
  component = fixture.componentInstance;
});

it('should not spin by default', () => {
  const refreshIcon = fixture.debugElement.query(By.css('.fa-sync-alt'));
  expect(refreshIcon.nativeNode.className).not.toContain('spin-in');
});

it('should not spin if isRefreshAnimationPlaying = false', () => {
  component.isRefreshAnimationPlaying = false;
  fixture.detectChanges();

  const refreshIcon = fixture.debugElement.query(By.css('.fa-sync-alt'));
  expect(refreshIcon.nativeNode.className).not.toContain('spin-in');
});

it('should spin if isRefreshAnimationPlaying = true', () => {
  component.isRefreshAnimationPlaying = true;
  fixture.detectChanges();

  const refreshIcon = fixture.debugElement.query(By.css('.fa-sync-alt'));
  expect(refreshIcon.nativeNode.className).toContain('spin-in');
});
