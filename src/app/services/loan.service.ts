import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/server';

  createLoanAccount(data: any): Observable<any> {
    return this.http.post(this.url + '/loan-account', data);
  }
  getAllLoanAccounts(userId: any): Observable<any> {
    return this.http.get(this.url + `/loan-details/${userId}`);
  }
}
