import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

/**
 * @description
 * Validator that requires the control's value to match a regex pattern.
 * @param name The property name in error map.
 * @param pattern A regular expression to be used as is to test the values, or a string.
 * If a string is passed, the `\` character needs to be double of it, like `\\`.
 * @param message A property in error map.
 * @returns A validator function that returns an error map with the
 * [name] property if the validation check fails, otherwise `null`.
 */
export function patternValidator(name: string, pattern: string | RegExp, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(name) || isEmptyInputValue(pattern)) {
      return null;
    }

    const regExp: RegExp = typeof pattern === 'string'
      ? eval(`() => ${pattern}`)()
      : pattern;

    return regExp.test(control.value)
      ? null
      : {
          [name]: {
            actualValue: control.value,
            requiredPattern: regExp,
            message
          }
        };
  }
}
