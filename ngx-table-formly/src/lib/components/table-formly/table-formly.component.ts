import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray } from '@angular/forms';
import { isObservable, Observable, of, Subject } from 'rxjs';
import { last, takeUntil } from 'rxjs/operators';
import { BeforeSaveAllHook, BeforeSaveRowHook, TableFormlyAction, TableFormlyActionType, TableFormlyColumn } from '../../models';
import { TableFormlyRow } from '../../refs/table-formly-row';

@Component({
  selector: 'ngx-table-formly',
  templateUrl: './table-formly.component.html',
  styleUrls: ['./table-formly.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormlyComponent implements OnInit, OnDestroy {

  @Input() columns: TableFormlyColumn[] = [];
  @Input() models: object[] = [];
  @Input() tableBordered: boolean = false;
  @Input() showValidationMessage: boolean = true;
  @Input() beforeSaveRow: BeforeSaveRowHook;
  @Input() beforeSaveAll: BeforeSaveAllHook;
  @Input() actionsPosition: 'top'|'bottom'|'both' = 'top';
  @Input() actions: TableFormlyAction[] = [];
  @Input() showActions: boolean = true;

  @Output() modelsChange = new EventEmitter<object[]>();

  tableFormsArray: FormArray = new FormArray([]);
  tableRowsMap = new Set<TableFormlyRow>();
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  get tableRows(): TableFormlyRow[] {
    return Array.from(this.tableRowsMap);
  }

  get isShowActions(): boolean {
    return this.showActions && Array.isArray(this.actions) && this.actions.length > 0;
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initTableRowForms(this.models);
    this.tableFormsArray.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.models = value;
        this.modelsChange.emit(this.models);
      });
  }

  addFormsRow(model?: object, editOn?: boolean): void {
    const tableFormlyRow = new TableFormlyRow({ columns: this.columns, model, editOn });
    this.tableFormsArray.push(tableFormlyRow.formGroup);
    this.tableRowsMap.add(tableFormlyRow);
  }

  removeFormsRow(tableFormlyRow: TableFormlyRow, index: number): void {
    this.tableFormsArray.removeAt(index);
    this.tableRowsMap.delete(tableFormlyRow);
  }

  saveFormsRow(tableFormlyRow: TableFormlyRow): void {
    if (tableFormlyRow.valid) {
      this.executeBeforeSaveRowHook(tableFormlyRow)
        .subscribe((result: boolean) => {
          if (result === true) {
            tableFormlyRow.save();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        });
    }
  }

  saveAll(): void {
    const rows = this.tableRows.filter(({ editOn }) => editOn);
    const valid = rows.every(row => row.valid);

    if (rows.length > 0 && valid) {
      this.executeBeforeSaveAllHook(rows)
        .subscribe((result: boolean) => {
          result === true && rows.forEach(row => row.save());
          this.isLoading = false;
          this.cdr.detectChanges();
        });
    }
  }

  actionClickHandle(type: TableFormlyActionType): void {
    if (type === 'add') {
      this.addFormsRow(null, true);
    } else if (type === 'saveAll') {
      this.saveAll();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initTableRowForms(models: object[]): void {
    for (let model of models) {
      this.addFormsRow(model);
    }
  }

  private executeBeforeSaveRowHook(row: TableFormlyRow): Observable<boolean> {
    if (typeof this.beforeSaveRow === 'function') {
      const type = row.isNew ? 'add' : 'edit';
      const model = row.getValue();
      const formGroup = row.formGroup;
      const hookResult = this.beforeSaveRow({ type, model, formGroup, row });
      const observable$ = isObservable(hookResult) ? hookResult : of(hookResult);

      this.isLoading = true;
      return observable$.pipe(last());
    } else {
      return of(true);
    }
  }

  private executeBeforeSaveAllHook(rows: TableFormlyRow[]): Observable<boolean> {
    if (typeof this.beforeSaveAll === 'function') {
      const formGroups = rows.map(row => row.formGroup);
      const addModels = rows.filter(({ isNew }) => isNew).map(row => row.getValue());
      const editModels = rows.filter(({ isNew }) => !isNew).map(row => row.getValue());
      const hookResult = this.beforeSaveAll({
        addModels: addModels.length > 0 ? addModels : null,
        editModels: editModels.length > 0 ? editModels : null,
        formGroups,
        rows
      });
      const observable$ = isObservable(hookResult) ? hookResult : of(hookResult);

      this.isLoading = true;
      return observable$.pipe(last());
    } else {
      return of(true);
    }
  }

}
