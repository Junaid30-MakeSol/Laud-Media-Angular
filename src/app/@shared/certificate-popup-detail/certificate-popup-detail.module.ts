import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatePopupDetailComponent } from './certificate-popup-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [CertificatePopupDetailComponent],
  exports: [CertificatePopupDetailComponent],
})
export class CertificatePopupModule {}
