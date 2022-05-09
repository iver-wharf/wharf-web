import { DateFormatPipe } from './pipes/date.pipe';
import { NgModule } from '@angular/core';
import { IsValidBuildRefPipe, IsValidDatePipe, IsValidStringPipe } from './pipes/isvalid.pipe';
import { SyntaxHighlightComponent } from './syntax-highlight/syntax-highlight.component';
import { SyntaxHighlightService } from './syntax-highlight/syntax-highlight.service';
import { TimerComponent } from './timer/timer.component';
import { WharfSpinnerAnimationComponent } from './animations/wharf-spinner-animation/wharf-spinner-animation.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DateFormatPipe,
    IsValidBuildRefPipe,
    IsValidDatePipe,
    IsValidStringPipe,
    SyntaxHighlightComponent,
    TimerComponent,
    WharfSpinnerAnimationComponent,
  ],
  exports: [
    DateFormatPipe,
    IsValidBuildRefPipe,
    IsValidDatePipe,
    IsValidStringPipe,
    SyntaxHighlightComponent,
    TimerComponent,
    WharfSpinnerAnimationComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    SyntaxHighlightService,
  ],
})
export class SharedModule { }
