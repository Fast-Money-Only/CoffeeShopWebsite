import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CoffeeService} from "../services/coffee.service";
import {NgForOf} from "@angular/common";
import {CakeModel} from "../cake/cake.Model";
import {CoffeeModel} from "./coffee.Model";

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.css'
})
export class CoffeeComponent implements OnInit{
  data: any;
  recommendedCake: any;

  constructor(private service: CoffeeService) {
  }
  ngOnInit(): void {
    this.service.getAllCoffees().subscribe(data => this.data = data);
  }

  getRecommendedCake(id: string){
    this.service
      .getRecommendedCake(id)
      .subscribe(recommendedCake => this.recommendedCake = recommendedCake);
  }

  flipCard(coffee: CoffeeModel) {
    this.getRecommendedCake(coffee.id);
    var coffees = document.getElementById(coffee.id + "coffees");
    var cakes = document.getElementById(coffee.id + "cakes");
    var card = document.getElementById(coffee.id + "card");
    // @ts-ignore
    if (coffees.style.display == "none")
    {
      // @ts-ignore
      coffees.style.display = "block";
      // @ts-ignore
      cakes.style.display = "none";
    }
    else
    {
      // @ts-ignore
      cakes.style.display = "block";
      // @ts-ignore
      coffees.style.display = "none";
    }
    var btn = document.getElementById(coffee.id + "flip");
    // @ts-ignore
    if (btn.innerText == "Coffee")
    {
      // @ts-ignore
      btn.innerText = "Recommended cakes";
    }else
    {
      // @ts-ignore
      btn.innerText = "Coffee";
    }
  }

  onDelete(id: string) {

  }
}
