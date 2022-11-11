import { Component, ElementRef, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CartService } from '../cart.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';
import { ProductModal } from './cart.model';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing') subTotalItems_existing: QueryList<ElementRef>;
  delete = faTimes;
  public products: any = [];
  public grandTotal!: number;
  resultValue: any;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    private shareService: SharedService
  ) {}
  public totalItem: number = 0;

  ngOnInit(): void {
    this.cartService.loadCart();
    this.products = this.cartService.getItems();
    this.getEmployeeInfo();
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.products = [...this.cartService.getItems()];
  }
  emptycart() {
    this.cartService.removeAllCart();
    this.products = [...this.cartService.getItems()];
  }

  changeSubtotal(item: any, index: any) {
    console.log(index);
    console.log(item);
    const qty = item.Quantity;
    const price = item.Price;
    const subTotal = price * qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, 'NOK');
    console.log(subTotal_converted);
    this.subTotalItems.toArray()[index].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
  }

  get total() {
    return this.products.reduce(
      (sum: any, x: any) => ({
        Quantity: 1,
        Price: sum.Price + x.Quantity * x.Price,
      }),
      { Quantity: 1, Price: 0 }
    ).Price;
  }

  onSubmit() {
    const detail = [] as any;
    this.products.forEach((element: any) => {
      const detailModel = {
        ProductId: element.Id,
        ProductName: element.Name,
        ProductDescription: element.Description,
        ProductNumber: element.Number,
        Price: element.Price,
        Quantity: element.Quantity,
        Total: element.Quantity * element.Price,
      };

      detail.push(detailModel);
    });

    const model = {
      StoreOrderDetail: detail,
    };

    console.log(model);

    this.shareService.createOrder(model).subscribe(
      (result: any) => {
        this.toastr.success('Order er opprettet', 'Info!');
        this.emptycart();
      },
      (error: { status: number }) => {
        if (error.status === 409) {
          this.toastr.error('Order fins allerede', 'Feil!');
        }
      }
    );
  }

  getEmployeeInfo() {
    this.shareService.getEmployee().subscribe((data) => {
      this.resultValue = data;
    });
  }
}
