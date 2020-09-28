import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormlyComponent } from './table-formly.component';

describe('TableFormlyComponent', () => {
  let component: TableFormlyComponent;
  let fixture: ComponentFixture<TableFormlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
