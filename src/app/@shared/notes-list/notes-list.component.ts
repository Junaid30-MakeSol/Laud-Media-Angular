import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  @ViewChild(NotesAddComponent)
  notesAddComponent: NotesAddComponent;
  @Input() entityId: number;

  notes: any;
  searchTerm: any;
  isActive: 1;
  orginalNotes: any[];
  constructor(private _sharedService: SharedService) {}

  ngOnInit() {
    this.populateNotesList();
  }

  public newNotes() {
    this.notesAddComponent.open();
  }

  populateNotesList(forceUpdate?: boolean) {
    this._sharedService.getNoteslist(this.entityId, forceUpdate).subscribe((result) => {
      this.notes = result;
    });
  }
  notesCreated() {
    this.populateNotesList(true);
  }
}
