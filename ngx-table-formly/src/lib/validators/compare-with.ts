import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyInputValue } from '../utils';

function findControlFromParent(parent: AbstractControl, controlPath: string[]): AbstractControl {
  const name = controlPath.pop();
  const control = parent.get(name);
  if (controlPath.length > 0 && control) {
    return findControlFromParent(control.parent, controlPath);
  } else {
    return control;
  }
}

export function compareWithValidator(controlName: string, message?: string): ValidatorFn {
  let subscription = null;
  return (control: AbstractControl): ValidationErrors|null => {
    const comparedControlPath = controlName.split('.');
    const comparedControl = findControlFromParent(control.parent, comparedControlPath);
    if (!comparedControl || isEmptyInputValue(control.value)) {
      // don't validate empty values to allow optional controls
      return null;
    }

    if (!subscription) {
      subscription = comparedControl.valueChanges
        .subscribe(() => {
          Promise.resolve().then(() => control.updateValueAndValidity());
        });
    }

    return comparedControl.value !== control.value
      ? {
          compareWith: {
            comparedControl,
            comparedValue: comparedControl.value,
            actualValue: control.value,
            message
          }
        }
      : null;
  }
}
