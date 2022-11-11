import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ERRORS } from '@app/@shared/custom-errors';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss'],
})
export class NotesAddComponent implements OnInit {
  @ViewChild('notesModal')
  notesModal: any;
  @Input() entityId: number;
  @Output()
  notesCreatedChange = new EventEmitter<boolean>();

  modalReference: any;
  isLoading: boolean;
  formGroup: FormGroup;
  customErrorMessages = CUSTOM_ERRORS;
  btnDisabled = false;
  delete = faSyncAlt;
  createdNotes: any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // this.modalReference = null;
  }

  ngOnInit() {
    this.isLoading = true;
    this.formGroup = this.formBuilder.group({
      Text: ['', [Validators.required, Validators.maxLength(500)]],
      EntityId: [this.entityId],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.toastr.error('Det har oppstått en feil. Prøv igjen senere!', 'Feil!');
      return;
    }
    this.btnDisabled = true;
    this._sharedService.createNotes(this.formGroup.value).subscribe(
      (result) => {
        this.createdNotes = result;
        this.toastr.success('Merknad er opprettet', 'Info!');
        this.btnDisabled = false;
        this.notesCreatedChange.emit(this.createdNotes);
        this.formGroup.reset();
        this.closeNotesModal(null);
      },
      (error) => {
        if (error.status === 409) {
          this.btnDisabled = false;
          this.toastr.error('Merknad finnes allerede', 'Feil!');
        }
      }
    );
  }
  public open() {
    this.formGroup.patchValue({
      EntityId: this.entityId,
    });
    this.modalReference = this.modalService.open(this.notesModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {}, // open
      (reason: any) => {} // close
    );
  }

  closeNotesModal(e: any) {
    this.formGroup.reset();
    this.modalReference.close();
  }
}
