import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FundtransferService {
  constructor(private http: HttpClient) {}

  transfer(data: any): Observable<any> {
    return this.http.put('http://localhost:8080/server/transfer', data);
  }

  getOTP(userId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/otp/${userId}`);
  }
}
