import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableFormlyRow } from '../refs/table-formly-row';

export interface BeforeSaveRowArg {
  type: 'add'|'edit';
  model: object;
  formGroup: FormGroup;
  row: TableFormlyRow;
}

export interface BeforeSaveAllArg {
  addModels?: object[];
  editModels?: object[];
  formGroups: FormGroup[];
  rows: TableFormlyRow[];
}

export type BeforeSaveRowHook = (arg: BeforeSaveRowArg) => boolean|Observable<boolean>;

export type BeforeSaveAllHook = (arg: BeforeSaveAllArg) => boolean|Observable<boolean>;
