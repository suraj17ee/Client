import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(userId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/profile/${userId}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.put('http://localhost:8080/server/profile/update', data);
  }
  postFile(userId:any,data: any): Observable<any> {
    return this.http.post("http://localhost:8080/server/uploadFile/6", data);
  }

  getFile(docId:any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/downloadFile/1`);
  }
}
