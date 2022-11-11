import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtcDatePickerComponent } from './utc-datepicker.component';

describe('UtcDatePickerComponent', () => {
  let component: UtcDatePickerComponent;
  let fixture: ComponentFixture<UtcDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UtcDatePickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtcDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
