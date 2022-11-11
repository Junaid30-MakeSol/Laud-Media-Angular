import { Component } from '@angular/core';
import { ConfirmState } from './confirm-state';
import { ConfirmOptions } from './ConfirmOptions';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  options: ConfirmOptions;

  constructor(private state: ConfirmState) {
    this.options = state.options;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}
