import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginModuleService {
  constructor(private http: HttpClient) {}
  authListner = new Subject<boolean>();

  saveUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/server/save', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/server/login/', user);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/forgot-password', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/reset-password', data);
  }

  verifyEmail(token: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/verify/${token}`);
  }

  getAuthListner() {
    return this.authListner;
  }

  getAuthListnerStatus() {
    return this.authListner.asObservable();
  }
}
