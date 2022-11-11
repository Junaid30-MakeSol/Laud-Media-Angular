import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ERRORS } from '@app/@shared/custom-errors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
})
export class DocumentEditComponent implements OnInit {
  @Output()
  fileStatusChange = new EventEmitter<boolean>();
  @ViewChild('fileModal')
  fileModal: any;
  fileName: any;
  EntityType: any;
  FileUploadedName: any;
  EntityId: any;
  UserId: any;
  GuId: any;
  Id: any;
  formGroup: FormGroup;
  modalReference: any;
  results: any;
  isLoading: boolean;
  productForm: FormGroup;
  submitted = false;
  resultValue: any;
  customErrorMessages = CUSTOM_ERRORS;
  closeResult: string;
  userModelRequest = {
    SortBy: 'Number',
    CurrentPage: 1,
    SortOrder: 'ASC',
    SearchTerm: '',
  };

  tempRequestModel: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private modalService: NgbModal,
    private _editCompanyService: SharedService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.tempRequestModel = this._editCompanyService.requestBody;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Description: ['', [Validators.required, Validators.maxLength(500)]],
      Id: [''],
      GuId: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Det er noe feil. Prøv senere', 'Feil!');
      return;
    }
    const model = {
      Description: this.formGroup.value.Description,
      FileName: this.fileName,
      GuId: this.GuId,
      EntityType: this.EntityType,
      EntityId: this.EntityId,
      UserId: this.UserId,
      FileUploadedName: this.FileUploadedName,
      Id: this.Id,
    };
    this._editCompanyService.updateFile(model).subscribe(
      (result) => {
        this.toastr.success('Fil er opprettet', 'Info!');
        this.fileStatusChange.emit(this.formGroup.value);
        this.formGroup.reset();
        this.closeFileModal(null);
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.error('Fil fins allerede', 'Feil!');
        }
      }
    );
  }

  public GetFileByGuid(guid: string) {
    this.isLoading = false;
    this._editCompanyService.getFileByGuid(guid).subscribe((result) => {
      this.fileName = result.FileName;
      this.EntityType = result.EntityType;
      this.FileUploadedName = result.FileUploadedName;
      this.EntityId = result.EntityId;
      this.UserId = result.UserId;
      this.GuId = result.GuId;
      this.Id = result.Id;
      this.formGroup.patchValue({
        Description: result.Description,
        Id: result.FileId,
        GuId: result.FileGuId,
      });
    });
  }
  get f() {
    return this.formGroup.controls;
  }
  open(file: any) {
    console.log(file.FileName);
    this.GetFileByGuid(file.FileGuId);

    this.modalReference = this.modalService.open(this.fileModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }
  closeFileModal(e: any) {
    this.formGroup.reset();
    this.modalReference.close();
  }
}
