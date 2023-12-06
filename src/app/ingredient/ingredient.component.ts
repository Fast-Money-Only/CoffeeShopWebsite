import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../services/ingredient.service";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit{
  data: any;

  constructor(private service: IngredientService) {
  }

  ngOnInit(): void {
    this.service.getIngredients().subscribe(data => this.data = data);
  }
}
