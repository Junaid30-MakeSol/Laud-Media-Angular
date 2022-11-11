import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ConfirmService } from '@app/@shared/confirm-dialog/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '@app/@shared/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(ProductAddComponent)
  productAddComponent: ProductAddComponent;
  @ViewChild(ProductEditComponent)
  productEditComponent: ProductEditComponent;
  results: any;
  isLoading: boolean;
  delete = faTimes;
  cart = faShoppingCart;
  product: string;
  products: any;
  SearchTerm: any;
  isAdded: any;

  productItems: any = [];
  searchForm: FormGroup;
  constructor(
    private _ProductService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private alertService: ConfirmService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.searchProducts();
    this.isLoading = true;
  }
  public newProduct() {
    this.productAddComponent.open();
  }
  public searchProducts() {
    this._ProductService.getPage().subscribe((result) => {
      this.products = result;
    });
  }
  edit(product: any) {
    this.productEditComponent.open(product);
  }

  productChange(obj: any) {
    this.searchProducts();
  }
  public productCreated() {
    this.searchProducts();
  }
  deleteProduct(e: any, id: number) {
    e.stopPropagation();
    e.preventDefault();
    this.alertService.confirm().then((result) => {
      if (result.value) {
        this._ProductService.deleteProduct(id).subscribe(() => {
          this.toastr.success('Produkt er slettet', 'Slett');
          this.searchProducts();
        });
      }
    });
  }
}
