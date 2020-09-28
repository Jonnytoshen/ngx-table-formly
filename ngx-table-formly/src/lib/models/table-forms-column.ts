import { ValidatorFn } from '@angular/forms';
import { SelectList } from './select-option';

export type TableFormlyColumnType
  = 'default'
  | 'operation';

export type TableFormlyControlType
  = 'checkbox'
  | 'date'
  | 'datetime'
  | 'input'
  | 'inputNumber'
  | 'textarea'
  | 'radio'
  | 'select'
  | 'switch'
  | 'time'
  | 'password';

export type TableFormlyControlSize
  = 'small'
  | 'default'
  | 'large';

export type TableFormlyValidationNames
  = 'min'
  | 'max'
  | 'required'
  | 'requiredTrue'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'range'
  | 'lengthRange'
  | 'compareWith'
  | 'compareWithValue';

export interface TableFormlyValidation {
  name: TableFormlyValidationNames | string;
  // For `name` is min or range, and `validation`, `pattern` wasn't provided
  min?: number;
  // For `name` is max or range, and `validation`, `pattern` wasn't provided
  max?: number;
  // For `name` is minLength or lengthRange, and `validation`, `pattern` wasn't provided
  minLength?: number;
  // For `name` is maxLength or lengthRange, and `validation`, `pattern` wasn't provided
  maxLength?: number;
  // For `name` is compareWith, and `validation`, `pattern` wasn't provided
  comparedControlName?: string;
  // For `name` is compareWithValue, and `validation`, `pattern` wasn't provided
  comparedValue?: any;
  validation?: ValidatorFn;
  pattern?: string | RegExp;
  message?: string;
}

export interface TableFormlyHead {
  title?: string;
  description?: string;
  // Specify how head content is aligned
  align?: 'left' | 'right' | 'center';
}

export interface TableFormlyControl {
  type: TableFormlyControlType;
  // size of form control
  size?: TableFormlyControlSize;
  // For textarea
  rows?: number;
  placeholder?: string;
  // For select and radio
  options?: SelectList;
  // For type of `date`, `datetime` and `time`, default is `yyyy-MM-dd`
  dateFormat?: string;
  validations?: TableFormlyValidation[];
  defaultValue?: any;
}

export interface TableFormlyColumn {
  key?: string;
  // type of column. If it wasn't provided, the value of it is `default`.
  type?: TableFormlyColumnType;
  // Width of column
  width?: number|string;
  head?: TableFormlyHead;
  control?: TableFormlyControl;
  hidden?: boolean,
  cellAlign?: 'left' | 'right' | 'center';
  // For control type of `date`, `datetime` and `time`, default is `yyyy-MM-dd`
  cellDateFormat?: string;
}
