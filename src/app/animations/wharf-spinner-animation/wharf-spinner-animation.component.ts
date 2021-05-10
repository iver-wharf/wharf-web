import { Component, Input } from '@angular/core';

@Component({
  selector: 'wh-spinner-animation',
  templateUrl: './wharf-spinner-animation.component.html',
  styleUrls: ['./wharf-spinner-animation.component.scss']
})
export class WharfSpinnerAnimationComponent {
  @Input() isRefreshAnimationPlaying ? = false;
}
