import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  saveAccount(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/server/account/', data);
  }

  getAccounts(userId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/all-accounts/${userId}`);
  }

  getAccountPDF(userId: number): Observable<any> {
    var url = 'http://localhost:8080/server/account/exportPdf/' + userId;
    var authorization = 'Bearer ' + sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorization,
      responseType: 'blob',
    });

    return this.http.get<Blob>(url, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  getTransactionPDF(accountId: number): Observable<any> {
    var url = 'http://localhost:8080/server/transaction/exportPdf/' + accountId;
    var authorization = 'Bearer ' + sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorization,
      responseType: 'blob',
    });

    return this.http.get<Blob>(url, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }
}
