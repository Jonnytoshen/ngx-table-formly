import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the control's value to be less than or equal to the provided number.
 * @param max The maximum value.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * `max` property if the validation check fails, otherwise `null`.
 */
export function maxValidator(max: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max
      ? {
          max: {
            requiredMaxValue: max,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
