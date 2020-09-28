import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormlyCellComponent } from './table-formly-cell.component';

describe('TableFormlyCellComponent', () => {
  let component: TableFormlyCellComponent;
  let fixture: ComponentFixture<TableFormlyCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormlyCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormlyCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
