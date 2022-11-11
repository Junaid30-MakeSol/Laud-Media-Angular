import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-company-pdf-popup-detail',
  templateUrl: './company-pdf-popup-detail.component.html',
  styleUrls: ['./company-pdf-popup-detail.component.scss'],
})
export class CompanyPdfPopupDetailComponent implements OnInit {
  @ViewChild('companyModal')
  companyModal: any;
  result: any;
  company: any;
  modalReference: any;
  Body: any;
  date = new Date();
  constructor(private modalService: NgbModal, private _sharedService: SharedService) {}

  ngOnInit() {}

  public GetCopmanyPdfDetailByGuid(guid: string) {
    this._sharedService.getCompanyPdfByGuid(guid).subscribe((result) => {
      this.company = result;
    });
  }
  open(guid: any) {
    this.GetCopmanyPdfDetailByGuid(guid);
    this.modalReference = this.modalService.open(this.companyModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  closeCompanyModal(e: any) {
    this.modalReference.close();
  }
}
