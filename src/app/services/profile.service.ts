import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const userId = localStorage.getItem("userId");
    return this.http.get(`http://localhost:8080/server/profile/${userId}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.put("http://localhost:8080/server/profile/update", data);
  }
}
