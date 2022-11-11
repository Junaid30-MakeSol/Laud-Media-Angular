import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-utcdate-picker',
  templateUrl: './utc-datepicker.component.html',
  styleUrls: ['./utc-datepicker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UtcDatePickerComponent),
      multi: true,
    },
  ],
})
export class UtcDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  placeholder: string = 'dd.mm.yyyy';
  value: any;
  onChange: (value: any) => void;
  constructor() {}
  ngOnInit() {}
  bsValueChange(val: Date) {
    setTimeout(() => {
      this.value = val;
      if (val instanceof Date) {
        this.onChange(new Date(val.getTime() - val.getTimezoneOffset() * 60 * 1000));
      } else {
        this.onChange(val);
      }
    });
  }
  writeValue(val: any): void {
    if (val) {
      if (val instanceof Date) {
        this.value = val;
        //this.value = new Date(val.getTime() + val.getTimezoneOffset() * 60 * 1000);
      } else {
        this.value = val;
      }
    }
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
}
