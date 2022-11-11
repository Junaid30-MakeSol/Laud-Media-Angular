import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSelfComponent } from './datepicker.component';

describe('DatePickerSelfComponent', () => {
  let component: DatePickerSelfComponent;
  let fixture: ComponentFixture<DatePickerSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerSelfComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
