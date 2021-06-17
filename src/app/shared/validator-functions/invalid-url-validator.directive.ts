import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * Validates there are no errors when constructing a URL from the string.
 */
export const invalidUrlValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  try {
    new URL(control.value);
    return null;
  } catch (e) {
    return {invalidUrl: {value: `The url ${control.value} is not valid.`}};
  }
};
