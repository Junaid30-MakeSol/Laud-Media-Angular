import { Component, EventEmitter, OnInit, Output, ViewChild, Input, OnDestroy } from '@angular/core';
import { FileQueueObject, FileUploaderService } from './file-uploader.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  private uploadSubscription: Subscription;

  @Input() events: Observable<any>;

  @Input() EntityType: number;
  delete = faTrashAlt;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput: { nativeElement: any };
  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploaderService) {}

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
    this.uploader.EntityType = this.EntityType;
    this.uploadSubscription = this.events.subscribe((id: number) => {
      this.uploadAll(id);
    });
  }

  ngOnDestroy() {
    this.uploadSubscription.unsubscribe();
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  };

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }
  uploadAll(id: number) {
    this.uploader.EntityId = id;
    this.uploader.uploadAll();
  }
}
