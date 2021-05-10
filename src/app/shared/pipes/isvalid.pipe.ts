import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whIsValidString'
})
export class IsValidStringPipe implements PipeTransform {
  transform(value: any): boolean {
    return typeof value === 'string' && value !== '';
  }
}

@Pipe({
  name: 'whIsValidBuildRef'
})
export class IsValidBuildRefPipe implements PipeTransform {
  transform(value: any): boolean {
    return Number.isInteger(value) && value > 0;
  }
}

@Pipe({
  name: 'whIsValidDate'
})
export class IsValidDatePipe implements PipeTransform {
  transform(value: any): boolean {
    return value
      && Object.getPrototypeOf(value) === Date.prototype
      && !isNaN(value.getTime());
  }
}
