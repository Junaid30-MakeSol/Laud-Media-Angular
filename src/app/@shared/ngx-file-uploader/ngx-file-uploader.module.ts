import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileUploaderComponent } from './ngx-file-uploader.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgxUploaderModule, NgbModule],
  declarations: [NgxFileUploaderComponent],
  exports: [NgxFileUploaderComponent, NgxUploaderModule],
})
export class FileUploaderModule {}
