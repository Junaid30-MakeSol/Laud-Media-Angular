import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list.component';
import { FileUploaderModule } from '../ngx-file-uploader/ngx-file-uploader.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentEditModule } from '../document-edit/document-edit.module';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FileUploaderModule, DocumentEditModule],
  declarations: [DocumentListComponent],
  exports: [DocumentListComponent],
})
export class DocumentListModule {}
