import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderModule } from '../ngx-file-uploader/ngx-file-uploader.module';
import { DocumentEditComponent } from './document-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '../custom-errors';

@NgModule({
  imports: [
    CommonModule,
    FileUploaderModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
  ],
  declarations: [DocumentEditComponent],
  exports: [DocumentEditComponent],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
  ],
})
export class DocumentEditModule {}
