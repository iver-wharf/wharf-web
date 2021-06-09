import { DateFormatPipe } from './date.pipe';
import { NgModule } from '@angular/core';
import { IsValidBuildRefPipe, IsValidDatePipe, IsValidStringPipe } from './isvalid.pipe';

@NgModule({
  declarations: [
    DateFormatPipe,
    IsValidBuildRefPipe,
    IsValidDatePipe,
    IsValidStringPipe,
  ],
  exports: [
    DateFormatPipe,
    IsValidBuildRefPipe,
    IsValidDatePipe,
    IsValidStringPipe,
  ],
})
export class SharedModule { }
