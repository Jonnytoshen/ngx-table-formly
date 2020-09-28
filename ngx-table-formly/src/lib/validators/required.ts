import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the control have a non-empty value.
 * @param message A property in error map.
 * @returns An error map with the `required` property
 * if the validation check fails, otherwise `null`.
 */
export function requiredValidator(message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    return isEmptyInputValue(control.value)
      ? {
          required: {
            required: true,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
