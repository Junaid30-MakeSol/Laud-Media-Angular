import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmState } from './confirm-state';
import { ConfirmOptions } from './ConfirmOptions';

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private modalService: NgbModal, private state: ConfirmState) {}

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  confirm(): Promise<any> {
    const options: ConfirmOptions = {
      title: 'Bekreft sletting',
      message: 'Er du sikker på at du vil slette? Dette kan ikke angres.',
      confirmButtonText: 'Slett',
    };
    this.state.options = options;
    this.state.modal = this.modalService.open(ConfirmDialogComponent);

    return new Promise((resolve) => {
      this.state.modal.result.then(
        (result: any) => {
          const res = {
            value: true,
          };
          resolve(res);
        },
        (reason: any) => {
          console.log(reason);
          const res = {
            value: false,
          };
          resolve(res);
        }
      );
    });
  }

  confirmAssociation(): Promise<any> {
    const options: ConfirmOptions = {
      title: 'Bekreft tilknytning',
      message: 'Er du sikker på at du vil legge til/fjenre tilknytning? Dette kan ikke angres.',
      confirmButtonText: 'Bekreft',
    };
    this.state.options = options;
    this.state.modal = this.modalService.open(ConfirmDialogComponent);

    return new Promise((resolve) => {
      this.state.modal.result.then(
        (result: any) => {
          const res = {
            value: true,
          };
          resolve(res);
        },
        (reason: any) => {
          console.log(reason);
          const res = {
            value: false,
          };
          resolve(res);
        }
      );
    });
  }
}
