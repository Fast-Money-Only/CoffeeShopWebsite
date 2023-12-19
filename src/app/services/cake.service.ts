import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CakeModel} from "../cake/cake.Model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private baseUrl = "http://localhost:5056/api/Cake"

  constructor(private http: HttpClient) { }

  getCakes() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetCakes")
  }

  addCake(cake: CakeModel) : Observable<any>{
    return this.http.post(this.baseUrl, cake)
  }


  deleteCake(id: string) : Observable<any>{
    return this.http.delete(this.baseUrl + "/" + id)
  }

}
