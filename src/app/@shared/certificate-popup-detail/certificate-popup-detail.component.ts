import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-certificate-popup-detail',
  templateUrl: './certificate-popup-detail.component.html',
  styleUrls: ['./certificate-popup-detail.component.scss'],
})
export class CertificatePopupDetailComponent implements OnInit {
  @ViewChild('certificateModal')
  certificateModal: any;
  result: any;
  certificate: any;
  modalReference: any;
  Body: any;
  constructor(private modalService: NgbModal, private _sharedService: SharedService) {}

  ngOnInit() {}

  public GetEmployeeCertificateByGuid(guid: string) {
    this._sharedService.getEmployeeCertificateByGuid(guid).subscribe((result) => {
      this.certificate = result;
    });
  }
  open(guid: any) {
    this.GetEmployeeCertificateByGuid(guid);
    this.modalReference = this.modalService.open(this.certificateModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  closeCertificateModal(e: any) {
    this.modalReference.close();
  }
}
