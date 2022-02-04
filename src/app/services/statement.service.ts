import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http: HttpClient) { }

  getStatements(fromAccountId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/history/${fromAccountId}`);
  }
}
