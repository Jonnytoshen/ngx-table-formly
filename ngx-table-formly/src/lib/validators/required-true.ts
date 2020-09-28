import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 * @param message A property in error map.
 * @returns An error map that contains the `requiredTrue` property
 * if the validation check fails, otherwise `null`.
 */
export function requiredTrueValidator(message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    return control.value !== true
      ? {
          requiredTrue: {
            requiredTrue: true,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
