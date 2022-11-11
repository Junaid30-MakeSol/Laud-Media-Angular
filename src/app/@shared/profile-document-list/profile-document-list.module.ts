import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDocumentListComponent } from './profile-document-list.component';
@NgModule({
  imports: [CommonModule],
  declarations: [ProfileDocumentListComponent],
  exports: [ProfileDocumentListComponent],
})
export class ProfileDocumentListModule {}
