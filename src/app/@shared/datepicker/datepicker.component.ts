import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatePickerSelfComponent implements ControlValueAccessor {
  @Input() parent: FormGroup;
  @ViewChild('datePickerInput', { static: true })
  public datePickerInput: ElementRef<HTMLInputElement>;

  public date: string;
  public onTouched: () => void;

  constructor(private renderer: Renderer2) {}

  public onInputChange(value: Date): void {
    // ngx-bootstrap might give us a string "Invalid date"
    // if it does, ignore it and save null instead
    const updatedValue = typeof this.date === 'string' ? null : value;
    if (updatedValue === null) {
      // override ngx-bootstraps "Invalid date" string on the native input
      this.renderer.setProperty(this.datePickerInput.nativeElement, 'value', '');
    }

    // this.writeValue(updatedValue);
    this.onChange(updatedValue);
  }

  public writeValue(value: Date): void {
    //  this.date = value;
  }

  public onChange(value: Date) {
    //  this.date = value;
    // tslint:disable-next-line: one-variable-per-declaration
    const val = new Date(value),
      mnth = ('0' + (val.getMonth() + 1)).slice(-2),
      day = ('0' + val.getDate()).slice(-2);
    const x = [val.getFullYear(), mnth, day].join('-');
    console.log(x);
    this.date = x;
  }

  public registerOnChange(fn: (value: Date) => void): void {
    // this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
