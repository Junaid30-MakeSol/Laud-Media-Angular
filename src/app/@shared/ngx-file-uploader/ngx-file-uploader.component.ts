import { Component, Input, EventEmitter, Output } from '@angular/core';
import { environment } from '@env/environment';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, humanizeBytes, UploadStatus } from 'ngx-uploader';

@Component({
  selector: 'app-ngx-file-uploader',
  templateUrl: './ngx-file-uploader.component.html',
  styleUrls: ['./ngx-file-uploader.component.scss'],
})
export class NgxFileUploaderComponent {
  @Input() EntityId: number;
  @Input() EntityType: number;
  @Output()
  allFileUploaded: EventEmitter<string>;

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  currentFile: UploadFile;
  token = '';
  totalFiles = 0;
  constructor() {
    this.options = { concurrency: 1, maxUploads: 0 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.allFileUploaded = new EventEmitter<string>();
    const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');

    if (savedCredentials) {
      const data = JSON.parse(savedCredentials);
      this.token = data.access_token;
    }
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        this.totalFiles = this.files.length;
        const event: UploadInput = {
          type: 'uploadAll',
          url: environment.serverUrl + '/api/file/upload',
          method: 'POST',
          headers: { Authorization: 'Bearer ' + this.token },
          data: { EntityId: this.EntityId.toString(), EntityType: this.EntityType.toString() },
        };
        this.uploadInput.emit(event);

        console.log('All added to Queue');
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
          console.log('added to Queue');
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(
            (file) => typeof output.file !== 'undefined' && file.id === output.file.id
          );
          this.files[index] = output.file;
          this.currentFile = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        console.log('removing');
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        this.totalFiles = this.totalFiles - 1;
        if (this.totalFiles === 0) {
          this.allFileUploaded.emit('done');
        }
        console.log('i am done' + this.files.length);
        break;
    }
    this.files = this.files.filter((file) => file.progress.status !== UploadStatus.Done);
  }
}
