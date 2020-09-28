import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { TableFormlyColumn, TableFormlyValidation } from '../models/table-forms-column';
import { compareWithValidator, emailValidator, lengthRangeValidator, maxLengthValidator, maxValidator, minLengthValidator, minValidator, patternValidator, rangeValidator, requiredTrueValidator, requiredValidator } from '../validators';

export class TableFormlyRow {
  private _formGroup: FormGroup;
  private _columns: TableFormlyColumn[];
  private _editOn: boolean = false;
  private _model: object = {};
  private _isNew: boolean = true;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  get columns(): TableFormlyColumn[] {
    return this._columns.filter(({ type }) => !type || type === 'default');
  }

  set editOn(value: boolean) {
    this._editOn = value;
  }

  get editOn(): boolean {
    return this._editOn;
  }

  get defaultModel(): Object {
    return this.columns.reduce((model, { key, control }) => ({
      ...model,
      [key]: control.defaultValue
    }), {});
  }

  get valid(): boolean {
    for (let i in this.formGroup.controls) {
      this.formGroup.controls[ i ].markAsDirty();
      this.formGroup.controls[ i ].updateValueAndValidity();
    }
    return this.formGroup.valid;
  }

  get isNew(): boolean {
    return this._isNew;
  }

  constructor(options: { columns: TableFormlyColumn[], model?: object, editOn?: boolean }) {
    const { columns, model, editOn } = options;
    this._columns = columns;
    this._model = model;
    this._editOn = typeof editOn === 'boolean' ? editOn : false;
    this._isNew = !(this._model !== null && typeof this._model === 'object');
    this._formGroup = this._builder(this._columns, this._model);
  }

  getValue(): object {
    return this.formGroup.value;
  }

  save(): void {
    if (this.valid) {
      this._model = this.formGroup.value;
      this.editOn = false;
      this._isNew = false;
    }
  }

  cancel(): void {
    const value = this._model !== null && typeof this._model === 'object' ? this._model : {};
    this._formGroup.reset(value);
    this.editOn = false;
  }

  private _builder(columns: TableFormlyColumn[], model?: object): FormGroup {
    const formGroupState = model !== null && typeof model === 'object' ? model : this.defaultModel;
    const controls = columns
      .filter(({ type }) => !type || type === 'default')
      .reduce<{ [key:string]: AbstractControl }>((formControls, column) => {
        const { key, control } = column;
        const formState = typeof formGroupState[key] === 'undefined' ? null : formGroupState[key];
        const formControl = new FormControl(formState);
        if (Array.isArray(control.validations)) {
          const validators = control.validations
            .map(v => this._validatorBuilder(v))
            .filter(v => !!v);
          formControl.clearValidators();
          formControl.setValidators(validators);
        }
        return { ...formControls, [key]: formControl };
      }, {});
    return new FormGroup(controls);
  }

  private _validatorBuilder(options: TableFormlyValidation): ValidatorFn {
    const { name, pattern, validation, message,
      min, max, minLength, maxLength, comparedControlName, comparedValue } = options;
    if (typeof validation === 'function') {
      return validation;
    } else if (pattern) {
      return patternValidator(name, pattern, message);
    } else if (name === 'min') {
      return minValidator(min, message);
    } else if (name === 'max') {
      return maxValidator(max, message);
    } else if (name === 'required') {
      return requiredValidator(message);
    } else if (name === 'requiredTrue') {
      return requiredTrueValidator(message);
    } else if (name === 'email') {
      return emailValidator(message);
    } else if (name === 'minLength') {
      return minLengthValidator(minLength, message);
    } else if (name === 'maxLength') {
      return maxLengthValidator(maxLength, message);
    } else if (name === 'range') {
      return rangeValidator(min, max, message);
    } else if (name === 'lengthRange') {
      return lengthRangeValidator(minLength, maxLength, message);
    } else if (name === 'compareWith') {
      return compareWithValidator(comparedControlName, message);
    } else if (name === 'compareWithValue') {
      return compareWithValidator(comparedValue, message);
    } else {
      return null;
    }
  }
}
