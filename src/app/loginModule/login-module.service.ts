import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginModuleService {

  constructor(private http : HttpClient) { }
  
  saveUser(userSaveData: any): Observable<any>{
    return this.http.post('url',userSaveData);
  }

  loginUser(userloginData: any): Observable<any>{
    return this.http.post('url',userloginData);
  }
}
