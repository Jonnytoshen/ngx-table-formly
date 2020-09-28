import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the control's value to be greater than or equal to the provided number.
 * @param min The minimum value.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * `min` property if the validation check fails, otherwise `null`.
 */
export function minValidator(min: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min
      ? {
          min: {
            requiredMinValue: min,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
