import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormlyActionsComponent } from './table-formly-actions.component';

describe('TableFormlyActionsComponent', () => {
  let component: TableFormlyActionsComponent;
  let fixture: ComponentFixture<TableFormlyActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormlyActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormlyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
