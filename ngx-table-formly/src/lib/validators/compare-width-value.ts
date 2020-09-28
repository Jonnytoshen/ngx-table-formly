import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

export function compareWithValueValidator(value: any, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    return control.value !== value
      ? {
          comparedValue: value,
          actualValue: control.value,
          message
        }
      : null;
  }
}
