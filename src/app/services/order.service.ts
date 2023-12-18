import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderModel} from "../order/order.Model";
import {ProductModel} from "../order-process/product.Model";
import {OrderProductModel} from "../order-process/orderProduct.Model";

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

  getOrderProducts(id: string): Observable<Object>{
    return this.http.get(this.baseUrl + "/GetOrderProducts/" + id)
  }

  updateOrder(id: string, order: OrderModel): Observable<Object>{
    return this.http.put(this.baseUrl + "/" + id, order);
  }

  getProduct(id: string): Observable<Object>{
    return this.http.get("http://localhost:5056/api/Product/88f3ee66-eb2e-45b7-92d3-0ece5c24de60");
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

  addProduct(product: ProductModel): Observable<any>{
    return this.http.post('http://localhost:5056/api/Product', product);
  }

  addOrderProducts(orderProduct: OrderProductModel):Observable<any> {
    return this.http.post(this.baseUrl + '/OrderProducts/', orderProduct);
  }
}
