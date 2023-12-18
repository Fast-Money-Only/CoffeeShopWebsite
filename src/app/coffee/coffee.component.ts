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
  coffeeBool: boolean = false;

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


  showAddCoffee(): void{
      if(this.coffeeBool == false) {
        let contentToShow = document.getElementById("addCoffeeDiv");
        // @ts-ignore
        contentToShow.style.display = "block";
        this.coffeeBool = true;
      } else {
        let contentToHide = document.getElementById('addCoffeeDiv');
        // @ts-ignore
        contentToHide.style.display = 'none';
        this.coffeeBool = false;

        let cofName = document.getElementById('coffeeName');
        let cofPrice = document.getElementById('coffeePrice');


        // @ts-ignore
        cofName.innerText = '';
        // @ts-ignore
        cofPrice.style.content = '';

        this.ngOnInit();
      }
  }

  addCoffee(addCoffeeForm: any): void{
    let coffee = new CoffeeModel();
    coffee.name = addCoffeeForm.value.coffeeNameInput;
    coffee.price = addCoffeeForm.value.coffeePriceInput;


    this.service.addCoffee(coffee).subscribe((response) => {console.log(response);this.ngOnInit()})
  }


  onDelete(id: string) {
    this.service.deleteCoffee(id).subscribe((response) => {
      console.log(response); this.ngOnInit()});
    }
}
