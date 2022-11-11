import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  requestBody: any = {
    SortBy: 'Number',
    CurrentPage: 1,
    PageSize: 10,
    SearchTerm: '',
    SortOrder: 'ASC',
  };

  @Output()
  updateUsers: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  getPage(){
    return this.httpClient.get<any[]>('/api/product/list');
  }
  createProduct(product: any): Observable<any> {
    return this.httpClient.post<any>('/api/product/create', product);
  }
  updateProduct(e: any): Observable<any> {
    return this.httpClient.post<any>('/api/product/update', e);
  }
  deleteProduct(id: any) {
    return this.httpClient.get(`/api/product/delete/${id}`);
  }
}
