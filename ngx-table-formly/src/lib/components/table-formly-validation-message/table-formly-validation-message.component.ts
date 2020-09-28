import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-table-formly-validation-message',
  template: `<ng-container *ngFor="let msg of messages">{{ msg }}</ng-container>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormlyValidationMessageComponent {

  @Input() control: AbstractControl;

  get messages(): string[] {
    if (this.control && this.control.errors) {
      return Object
        .keys(this.control.errors)
        .map(key => this.control.errors[key].message);
    }
    return [];
  }

  constructor() { }

}
