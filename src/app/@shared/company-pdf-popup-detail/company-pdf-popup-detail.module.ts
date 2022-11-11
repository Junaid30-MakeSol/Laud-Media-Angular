import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyPdfPopupDetailComponent } from './company-pdf-popup-detail.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [CompanyPdfPopupDetailComponent],
  exports: [CompanyPdfPopupDetailComponent],
})
export class CompanyPdfPopupModule {}
