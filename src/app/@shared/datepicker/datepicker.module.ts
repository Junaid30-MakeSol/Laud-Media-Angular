import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerSelfComponent } from './datepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../shared.module';
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [DatePickerSelfComponent],
  exports: [DatePickerSelfComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerSelfComponent),
      multi: true,
    },
  ],
})
export class DatePickerModule {}
