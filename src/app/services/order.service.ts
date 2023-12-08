import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderModel} from "../order/order.Model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl :string = "http://localhost:5056/api/Order";

  constructor(private http: HttpClient) { }

  getOrders() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetOrders");
  }

  getPending() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetPending")
  }

  getDone() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetDone")
  }

  getCoffeePlaces() : Observable<Object>{
    return this.http.get("http://localhost:5056/api/CoffeePlace/GetCoffeePlaces");
  }

  getPlace(id: string) : Observable<Object>{
    return this.http.get("http://localhost:5056/api/CoffeePlace/" + id);
  }

  getOrder(id: string): Observable<Object>{
    return this.http.get(this.baseUrl + id);
  }

  addOrder(order: OrderModel): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

  getUserOrders(id: string) : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetUserOrders/" + id)
  }
}
