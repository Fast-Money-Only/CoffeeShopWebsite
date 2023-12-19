import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IngredientModel} from "../ingredient/ingredient.Model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = "http://localhost:5056/api/Ingredient"
  constructor(private http: HttpClient) { }

  getIngredients() : Observable<Object>{
    return this.http.get(this.baseUrl + "/GetIngredients")
  }

  addIngredient(ingredient: IngredientModel) : Observable<any> {
    return this.http.post(this.baseUrl, ingredient);
  }

  deleteIngredient(id: string): Observable<Object> {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
