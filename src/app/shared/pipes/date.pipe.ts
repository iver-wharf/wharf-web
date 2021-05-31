import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'whDate',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, pattern: string = 'dd MMMM yyyy | hh:mm'): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(value, pattern);
  }
}
