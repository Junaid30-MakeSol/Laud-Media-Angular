import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ConfirmService } from '@app/@shared/confirm-dialog/confirm.service';
import { SharedService } from '../shared.service';
import { DocumentEditComponent } from '../document-edit/document-edit.component';
import { environment } from '@env/environment';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  @ViewChild(DocumentEditComponent)
  documentEditComponent: DocumentEditComponent;
  @ViewChild('ourForm') ourForm: any;
  @Input() EntityId: number;
  @Input() EntityType: number;
  @Input() IsIncludedAdmin: boolean;
  results: any;
  isLoading: boolean;
  file: string;
  files: any;
  page = 1;
  total: number;
  itemsPerPage = 5;
  totalPages = 1;
  SearchTerm: any;
  delete = faTimes;
  edit = faEdit;
  userModelRequest = {
    CurrentPage: 1,
    PageSize: environment.pageSize,
    SearchTerm: '',
    SortBy: 'FileCreateDate',
    SortOrder: 'Des',
    EntityType: this.EntityType,
    EntityId: this.EntityId,
    IsIncludedAdmin: this.IsIncludedAdmin,
  };
  baseUrl = environment.serverUrl;

  tempRequestModel: any;
  searchForm: FormGroup;
  constructor(
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private alertService: ConfirmService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: new FormControl(''),
    });
    this.searchFiles(1);
    this.isLoading = true;
  }

  public searchFiles(page: number) {
    this.userModelRequest.SearchTerm = this.searchForm.get('search').value;
    if (this.userModelRequest.SearchTerm !== '') {
      page = 1;
    }
    this.userModelRequest.CurrentPage = page;
    this.userModelRequest.EntityId = this.EntityId;
    this.userModelRequest.IsIncludedAdmin = this.IsIncludedAdmin;
    this.userModelRequest.EntityType = this.EntityType;
    this._sharedService.getPage(this.userModelRequest).subscribe((result) => {
      this.files = result.Items;
      this.page = result.CurrentPage;
      this.total = result.TotalItems;
      this.itemsPerPage = result.ItemsPerPage;
      this.totalPages = result.TotalPages;
    });
  }

  deleteFile(e: any, id: number) {
    e.stopPropagation();
    e.preventDefault();
    this.alertService.confirm().then((result) => {
      if (result.value) {
        this._sharedService.deleteFile(id).subscribe(() => {
          this.toastr.success('File er slettet', 'Slett');
          this.searchFiles(1);
        });
      }
    });
  }

  editFile(file: any) {
    this.documentEditComponent.open(file);
  }

  public fileStatusChange(obj: any) {
    const index = this.files.findIndex((x: any) => x.Id === obj.Id);
    this.files[index] = obj;
    this.searchFiles(1);
  }

  fileUploaded() {
    console.log('file uploaded');
    this.searchFiles(1);
  }
}
