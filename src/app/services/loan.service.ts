import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  createLoanAccount(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/server/loan-account', data);
  }
  getAllLoanAccounts(userId : any): Observable<any>{
    return this.http.get(`http://localhost:8080/server/loan-details/${userId}`)
  }
}
