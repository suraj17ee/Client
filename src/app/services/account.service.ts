import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  saveAccount(data: any): Observable<any>{
    return this.http.post('http://localhost:8080/server/account/1 ',data,{responseType: 'text'});
  }
}


