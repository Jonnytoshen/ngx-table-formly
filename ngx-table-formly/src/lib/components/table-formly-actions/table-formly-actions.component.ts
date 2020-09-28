import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { last } from 'rxjs/operators';
import { TableFormlyAction, TableFormlyActionType } from '../../models';

@Component({
  selector: 'ngx-table-formly-actions',
  templateUrl: './table-formly-actions.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormlyActionsComponent {

  @Input() actions: TableFormlyAction[] = [];

  @Output() actionClick = new EventEmitter<TableFormlyActionType>();

  constructor() { }

  onClickAction(action: TableFormlyAction, $event: Event): void {
    const { actionType, onClick } = action;
    const result = typeof onClick === 'function' ? onClick(action, $event) : true;
    const observable$ = isObservable(result) ? result : of(true);

    observable$
      .pipe(last())
      .subscribe((result: boolean) => {
        if (result === true) {
          this.actionClick.emit(actionType);
        }
      });
  }

}
