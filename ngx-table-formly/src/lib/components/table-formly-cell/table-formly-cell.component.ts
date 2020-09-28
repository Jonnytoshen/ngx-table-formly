import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectList, SelectOption, TableFormlyColumn, TableFormlyControl, TableFormlyControlSize, TableFormlyControlType, TableFormlyHead } from '../../models';

@Component({
  selector: 'ngx-table-formly-cell',
  templateUrl: './table-formly-cell.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormlyCellComponent {

  @Input() control: FormControl;
  @Input() column: TableFormlyColumn;
  @Input() editOn: boolean = false;
  @Input() showValidationMessage: boolean = true;

  get headOptions(): TableFormlyHead {
    return this.column.head;
  }

  get controlOptions(): TableFormlyControl {
    return this.column.control;
  }

  get type(): TableFormlyControlType {
    return this.controlOptions?.type;
  }

  get size(): TableFormlyControlSize {
    return this.controlOptions?.size;
  }

  get rows(): number {
    return this.controlOptions?.rows;
  }

  get placeholder(): string {
    const placeholder = this.controlOptions?.placeholder;
    return typeof placeholder === 'string' ? placeholder : '';
  }

  get selectList(): SelectOption[] {
    return this.selectListSerializer(this.controlOptions?.options);
  }

  get cellDateFormat(): string {
    const value = this.column.cellDateFormat;
    const type = this.controlOptions?.type;
    if (!value) {
      if (type === 'date') {
        return 'yyyy-MM-dd';
      } else if (type === 'datetime') {
        return 'yyyy-MM-dd HH:mm:ss';
      } else if (type === 'time') {
        return 'HH:mm:ss';
      }
    }
    return value;
  }

  get dateFormat(): string {
    return this.controlOptions?.dateFormat ? this.controlOptions?.dateFormat : this.cellDateFormat;
  }

  passwordVisible: boolean = false;

  constructor() { }

  private selectListSerializer(selectList: SelectList): SelectOption[] {
    const source: any[] = Array.isArray(selectList) ? selectList : [];
    return source.map(option => typeof option === 'string' ? { label: option, value: option } : option);
  }

}
