import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');
  cartNumber: number = 0;
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    // this.productList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.saveCart();
    this.CartItemFunc();
  }
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cartItemList));
  }

  loadCart(): void {
    this.cartItemList = JSON.parse(localStorage.getItem('cart_items')) ?? [];
  }
  itemInCart(item: any): boolean {
    return this.cartItemList.findIndex((o: any) => o.Id === item.Id) > -1;
  }

  getItems() {
    return this.cartItemList;
  }

  CartItemFunc() {
    if (localStorage.getItem('cart_items') != null) {
      var cartCount = JSON.parse(localStorage.getItem('cart_items'));
      this.cartNumber = cartCount.length;
      this.productList.next(this.cartNumber);
    }
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.Price;
    });
    return grandTotal;
  }

  removeAllCart() {
    this.cartItemList = [];
    localStorage.removeItem('cart_items');
    this.saveCart();
    this.CartItemFunc();
    // this.productList.next(this.cartItemList);
  }

  removeCartItem(item: any) {
    const index = this.cartItemList.findIndex((o: any) => o.Id === item.Id);

    if (index > -1) {
      this.cartItemList.splice(index, 1);
      this.saveCart();
      this.CartItemFunc();
    }
  }
}
