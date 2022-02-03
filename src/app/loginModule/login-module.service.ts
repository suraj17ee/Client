import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginModuleService {
  constructor(private http: HttpClient) {}
  loggedIn : boolean =  false;

  saveUser(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/server/save", user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/server/login/", user);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/forgot-password", data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/reset-password", data);
  }
}
