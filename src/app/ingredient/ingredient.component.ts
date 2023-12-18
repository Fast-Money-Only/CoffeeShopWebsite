import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../services/ingredient.service";
import {IngredientModel} from "./ingredient.Model";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit{
  data: any;
  ingredientBool: boolean = false;

  constructor(private service: IngredientService) {
  }

  ngOnInit(): void {
    this.service.getIngredients().subscribe(data => this.data = data);
  }

  addIngredient(addIngredientForm: any): void{
    let ingredient = new IngredientModel();
    ingredient.name = addIngredientForm.value.ingredientNameInput;

    this.service.addIngredient(ingredient).subscribe((response) => {console.log(response);this.ngOnInit()})
  }

  showAddIngredient(): void {
    if (this.ingredientBool == false) {
      let contentToShow = document.getElementById("addIngredientDiv");
      // @ts-ignore
      contentToShow.style.display = "block";
      this.ingredientBool = true;
    } else {
      let contentToHide = document.getElementById('addIngredientDiv');
      // @ts-ignore
      contentToHide.style.display = 'none';
      this.ingredientBool = false;

      this.ngOnInit();
    }
  }

  deleteIngredient(id: string){
    this.service.deleteIngredient(id).subscribe((response) => {
      console.log(response); this.ngOnInit()});
  }


}

