import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormlyValidationMessageComponent } from './table-formly-validation-message.component';

describe('TableFormlyValidationMessageComponent', () => {
  let component: TableFormlyValidationMessageComponent;
  let fixture: ComponentFixture<TableFormlyValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormlyValidationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormlyValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
