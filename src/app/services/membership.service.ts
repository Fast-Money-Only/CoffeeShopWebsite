import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../user/User.Model";
import {MembershipModel} from "../membership/Membership.Model";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private baseUrl :string = "http://localhost:5056/api/Membership";

  constructor(private http: HttpClient) { }

  getMembership(id: string): Observable<Object>{
    return this.http.get(this.baseUrl + "/" + id);
  }

  createMembership(membership: MembershipModel): Observable<any>{
    return this.http.post(this.baseUrl, membership);
  }
}
