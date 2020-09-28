import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { TableFormlyComponent } from './components/table-formly';
import { TableFormlyActionsComponent } from './components/table-formly-actions';
import { TableFormlyCellComponent } from './components/table-formly-cell';
import { TableFormlyValidationMessageComponent } from './components/table-formly-validation-message';

@NgModule({
  declarations: [
    TableFormlyComponent,
    TableFormlyActionsComponent,
    TableFormlyCellComponent,
    TableFormlyValidationMessageComponent
  ],
  exports: [
    TableFormlyComponent,
    TableFormlyActionsComponent,
    TableFormlyCellComponent,
    TableFormlyValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzInputModule,
    NzInputNumberModule,
    NzRadioModule,
    NzSelectModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzDividerModule,
    NzIconModule,
    NzButtonModule
  ]
})
export class TableFormlyModule { }
