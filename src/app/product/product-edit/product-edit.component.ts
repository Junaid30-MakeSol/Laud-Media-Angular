import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ERRORS } from '@app/@shared/custom-errors';
import { CustomDigitPipe } from '@app/@shared/custom-digit/custom-digit-pipe';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  @Input()
  departments: any;
  @Output()
  productChange = new EventEmitter<boolean>();
  @ViewChild('productModal')
  productModal: any;
  formGroup: FormGroup;
  modalReference: any;
  submitted = false;
  customErrorMessages = CUSTOM_ERRORS;
  closeResult: string;

  constructor(
    private _ProductService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private digitPipe: CustomDigitPipe
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(20)]],
      Number: ['', [Validators.required, Validators.maxLength(20)]],
      Price: ['', [Validators.required]],
      Description: [''],
      Status: [false, Validators.required],
      Id: [''],
      Guid: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Det er noe feil. Prøv senere', 'Feil!');
      return;
    }

    this.formGroup.patchValue({
      Price: this.convertFloatToDecimal(this.formGroup.value.Price),
    });
    this._ProductService.updateProduct(this.formGroup.value).subscribe(
      (data) => {
        this.toastr.success('Product er opprettet', 'Info!');
        this.productChange.emit(this.formGroup.value);
        this.formGroup.reset();
        this.closeProductModal(null);
      },
      (error: any) => {
        if (error.status === 409) {
          this.toastr.error('Produckt fins allerede', 'Feil!');
        }
      }
    );
  }
  open(product: any) {
    this.formGroup.patchValue({
      Name: product.name,
      Number: product.number,
      Price: this.digitPipe.transform(product.price),
      Description: product.description,
      Status: product.status,
      Id: product.id,
      Guid: product.guid,
    });
    this.modalReference = this.modalService.open(this.productModal, {
      size: 'lg',
    });
    this.modalReference.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }
  closeProductModal(e: any) {
    this.formGroup.reset();
    this.modalReference.close();
  }

  close() {
    this.modalService.dismissAll();
  }

  get f() {
    return this.formGroup.controls;
  }
  convertFloatToDecimal(value: any) {
    const price = value.toString().replace(',', '.').replace(' ', '');
    return price;
  }
}
