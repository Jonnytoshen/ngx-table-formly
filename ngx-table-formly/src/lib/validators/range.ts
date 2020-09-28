import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the control's value to be greater than or equal to the provided number,
 * meanwhile requires the control's value to be less than or equal to the provided number.
 * @param min The minimum value.
 * @param max the maximum value.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * `range` property if the validation check fails, otherwise `null`.
 */
export function rangeValidator(min: number, max: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min) || isEmptyInputValue(max)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && (value < min || value > max)
      ? {
          range: {
            requiredMinValue: min,
            requiredMaxValue: max,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
