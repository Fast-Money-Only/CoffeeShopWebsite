import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../user/User.Model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl :string = "http://localhost:5056/api/User";

  constructor(private http: HttpClient) { }

  getUsers() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetUsers");
  }

  getUser(id: string): Observable<Object>{
    return this.http.get(this.baseUrl + "/" + id);
  }

  updateUser(id: string, user: UserModel): Observable<Object>{
    return this.http.put(this.baseUrl + "/" + id, user);
  }

  createUser(user: UserModel): Observable<any>{
    return this.http.post(this.baseUrl, user);
  }

  deleteUser(id: string) : Observable<Object>{
    return this.http.delete(this.baseUrl + "/" + id);
  }

  getUserOrders(id: string): Observable<Object>{
    return this.http.get("http://localhost:5056/api/Order/GetUserOrders/" + id);
  }

  loginUser(email: string, password: string): Observable<Object>{
    return this.http.get(this.baseUrl + "/LoginUser/" + email + "/" + password);
  }
}

