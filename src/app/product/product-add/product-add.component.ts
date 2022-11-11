import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ERRORS } from '@app/@shared/custom-errors';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  @Input()
  departments: any;
  @Output()
  productCreatedChange = new EventEmitter<Boolean>();
  @ViewChild('productModal')
  productModal: any;
  formGroup: FormGroup;
  modalReference: any;
  customErrorMessages = CUSTOM_ERRORS;
  createdProduct: any;
  constructor(
    private _ProductService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      Number: ['', [Validators.required, Validators.maxLength(20)]],
      Price: ['', [Validators.required]],
      Description: [''],
      Status: [true, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.toastr.error('Det er noe feil. Prøv senere', 'Feil!');
      return;
    }
    this.formGroup.patchValue({
      Price: this.convertFloatToDecimal(this.formGroup.value.Price),
    });
    this._ProductService.createProduct(this.formGroup.value).subscribe(
      (result: any) => {
        this.toastr.success('Product er opprettet', 'Info!');
        this.productCreatedChange.emit(this.formGroup.value);
        this.formGroup.reset();
        this.closeProductModal(null);
        this.createdProduct = result;
      },
      (error: { status: number }) => {
        if (error.status === 409) {
          this.toastr.error('Produckt fins allerede', 'Feil!');
        }
      }
    );
  }

  open() {
    this.formGroup.patchValue({
      Status: true,
    });
    this.modalReference = this.modalService.open(this.productModal, {
      centered: true,
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

  get f() {
    return this.formGroup.controls;
  }
  convertFloatToDecimal(value: any) {
    const price = value.toString().replace(',', '.').replace(' ', '');
    return price;
  }
}
