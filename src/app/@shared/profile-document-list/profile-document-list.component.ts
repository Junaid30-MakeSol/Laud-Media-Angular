import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../shared.service';
import { environment } from '@env/environment';
@Component({
  selector: 'app-profile-document-list',
  templateUrl: './profile-document-list.component.html',
  styleUrls: ['./profile-document-list.component.scss'],
})
export class ProfileDocumentListComponent implements OnInit {
  @ViewChild('ourForm') ourForm: any;
  @Input() EntityId: number;
  @Input() EntityType: number;
  results: any;
  isLoading: boolean;
  file: string;
  files: any;
  page = 1;
  total: number;
  itemsPerPage = 5;
  totalPages = 1;
  SearchTerm: any;
  userModelRequest = {
    CurrentPage: 1,
    PageSize: environment.pageSize,
    SearchTerm: '',
    SortBy: 'FileCreateDate',
    SortOrder: 'Des',
    EntityType: this.EntityType,
    EntityId: this.EntityId,
  };
  baseUrl = environment.serverUrl;

  tempRequestModel: any;
  searchForm: FormGroup;
  constructor(private _sharedService: SharedService, private fb: FormBuilder) {}

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
    this.userModelRequest.EntityType = this.EntityType;
    this._sharedService.getPage(this.userModelRequest).subscribe((result) => {
      this.files = result.Items;
      this.page = result.CurrentPage;
      this.total = result.TotalItems;
      this.itemsPerPage = result.ItemsPerPage;
      this.totalPages = result.TotalPages;
    });
  }

  fileUploaded() {
    console.log('file uploaded');
    this.searchFiles(1);
  }
}
