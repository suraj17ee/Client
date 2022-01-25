import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginModuleService {

  constructor(private http : HttpClient) { }
  
  saveUser(user: any): Observable<any>{
    return this.http.post('http://localhost:8080/employees',user);
  }

  getUser(): Observable<any>{
    return this.http.get('http://localhost:8080/employees');
  }

  updateUser(id: number): Observable<any>{
    return this.http.get(`http://localhost:8080/employees${id}`);
  }
}
