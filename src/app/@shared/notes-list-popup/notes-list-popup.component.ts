import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notes-list-popup',
  templateUrl: './notes-list-popup.component.html',
  styleUrls: ['./notes-list-popup.component.scss'],
})
export class NotesListPopupComponent implements OnInit {
  @ViewChild(NotesListComponent)
  notesComponent: NotesListComponent;
  @ViewChild('notesModal')
  notesModal: any;
  @Input() entityId: number;
  modalReference: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open(employeeId: any) {
    this.entityId = employeeId;
    this.modalReference = this.modalService.open(this.notesModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  closeNotesModal(e: any) {
    this.modalReference.close();
  }
}
