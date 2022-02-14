import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080';
  upload(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/server/uploadFile/3', data, {
    reportProgress: true,
    responseType: 'json'
    });
    return this.http.request(newRequest);
  }
  getUserProfile(userId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/profile/${userId}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.put('http://localhost:8080/server/profile/update', data);
  }
  postFile(userId:any,data: any): Observable<any> {
    return this.http.post("http://localhost:8080/server/uploadFile/3", data);
  }

  getFile(docId:any): Observable<any> {
    return this.http.get(`http://localhost:8080/server/downloadFile/1`);
  }
}
