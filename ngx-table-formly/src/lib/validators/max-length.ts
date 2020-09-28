import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValidLength } from '../utils';

/**
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length.
 * @param maxLength The maxiumu characters.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * `maxLength` property if the validation check fails, otherwise `null`.
 */
export function maxLengthValidator(maxLength: number, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    return hasValidLength(control.value) && control.value.length > maxLength
      ? {
          maxLength: {
            requiredMaxLength: maxLength,
            actualLength: control.value.length,
            message
          }
        }
      : null
  }
}
