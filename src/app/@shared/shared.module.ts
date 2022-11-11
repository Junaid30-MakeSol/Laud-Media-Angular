import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from './custom-errors';
import {
  NgbModule,
  NgbPaginationModule,
  NgbModalModule,
  NgbActiveModal,
  NgbDatepickerModule,
  NgbButtonsModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { ConfirmService } from './confirm-dialog/confirm.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GrdFilterPipe } from '@app/pipes/grdfilter.pipe';
import { BooleanPipe } from '@app/pipes/boolean.pipe';
import { BooleanComplainPipe } from '@app/pipes/boolean-complain.pipe';
import { BooleanExpiryPipe } from '@app/pipes/boolean-Expiry.pipe';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
} from 'ng-pick-datetime';

import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { BooleanPersonTypePipe } from '@app/pipes/boolean-person-type.pipe';
import { UTCDatePickerModule } from './utc-datepicker/utc-datepicker.module';
defineLocale('nb', deLocale);

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD.MM.YYYY',
    containerClass: 'theme-orange',
    useUtc: false,
  });
}

@NgModule({
  imports: [
    NgBootstrapFormValidationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ConfirmDialogModule,
    NgbModule,
    FontAwesomeModule,
    NgbButtonsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    LoaderComponent,
    GrdFilterPipe,
    BooleanPipe,
    BooleanComplainPipe,
    BooleanExpiryPipe,
    BooleanPersonTypePipe,
  ],
  exports: [
    LoaderComponent,
    TranslateModule,
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgBootstrapFormValidationModule,
    NgbModalModule,
    BooleanPersonTypePipe,
    GrdFilterPipe,
    BooleanPipe,
    BooleanComplainPipe,
    BooleanExpiryPipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    UTCDatePickerModule,
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    // { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
    // { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN' },

    ConfirmService,
    NgbActiveModal,
    ToastrService,
    ,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {
  constructor(private localeService: BsLocaleService) {
    // this.localeService.use('en');
  }
}
