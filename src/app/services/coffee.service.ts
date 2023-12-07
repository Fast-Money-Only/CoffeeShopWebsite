import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CoffeeModel} from "../coffee/coffee.Model";

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private baseUrl = "http://localhost:5056/api/Coffee"

  constructor(private http: HttpClient) { }

  addCoffee(coffee: CoffeeModel) : Observable<any>{
    return this.http.post(this.baseUrl, coffee)
  }

  getAllCoffees() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetCoffees")
  }

  getRecommendedCake(id: string) : Observable<Object>{
    return this.http.get(this.baseUrl + "/CoffeeCake/" + id);
  }

  getAllCoffeeIngredients() : Observable<Object>{
    return this.http.get(this.baseUrl + "/CoffeeIngredients")
  }

  findCoffee(id: string) : Observable<Object>{
    return this.http.get(this.baseUrl + "/" + id)
  }

}
