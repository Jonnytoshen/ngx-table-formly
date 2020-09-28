import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValidLength, isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length.
 * @param minLength The minimum characters.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * `minLength` if the validation check fails, otherwise `null`.
 */
export function minLengthValidator(minLength: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }
    return control.value.length < minLength
      ? {
          minLength: {
            requiredMinLength: minLength,
            actualLength: control.value.length,
            message
          }
        }
      : null;
  }
}
