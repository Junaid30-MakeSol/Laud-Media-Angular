import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  requestBody: any = {
    CurrentPage: 1,
    PageSize: environment.pageSize,
    SearchTerm: '',
    SortBy: 'Name',
    SortOrder: 'ASC',
  };

  @Output()
  updateUsers: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  getPage(filter: any): Observable<any> {
    return this.httpClient.post<any[]>('/api/file/list', filter);
  }
  deleteFile(guid: any) {
    return this.httpClient.delete(`/api/file/delete/${guid}`);
  }
  getFileByGuid(guid: string): Observable<any> {
    return this.httpClient.get<any>(`/api/file/getfile/${guid}`);
  }
  updateFile(e: any): Observable<any> {
    return this.httpClient.put<any>('/api/file/update', e);
  }
  getEmployeeCertificateByGuid(employeeId: string): Observable<any> {
    return this.httpClient.get<any>(`/api/employeecertification/certificate/${employeeId}`);
  }
  getNoteslist(entityId: number, forceUpdate?: boolean) {
    const params = forceUpdate ? { forceUpdate: 'true' } : {};
    return this.httpClient.get(`/api/notes/list/${entityId}`, { params });
  }
  createNotes(notes: any) {
    return this.httpClient.post('/api/notes/create', notes);
  }

  getCompanyPdfByGuid(companyGuid: string): Observable<any> {
    return this.httpClient.get<any>(`/api/company/pdf/${companyGuid}`);
  }

  createOrder(orders: any) {
    return this.httpClient.post('/api/order/create', orders);
  }
  getEmployee(): Observable<any> {
    return this.httpClient.get<any>('/api/employee/getemployee');
  }
}
