import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UtcDatePickerComponent } from './utc-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD.MM.YYYY',
    containerClass: 'theme-green',
    useUtc: false,
  });
}
@NgModule({
  imports: [CommonModule, NgbModule, ReactiveFormsModule, FormsModule, RouterModule, BsDatepickerModule.forRoot()],
  declarations: [UtcDatePickerComponent],
  exports: [UtcDatePickerComponent],
  providers: [{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig }],
})
export class UTCDatePickerModule {}
