import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CoffeeModel} from "../coffee/coffee.Model";
import {UserModel} from "../user/User.Model";
import {Subscription} from "rxjs";
import {StorageService} from "../storage.service";
import {CoffeeService} from "../services/coffee.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CakeService} from "../services/cake.service";
import {CakeModel} from "../cake/cake.Model";

@Component({
  selector: 'app-order-process',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './order-process.component.html',
  styleUrl: './order-process.component.css'
})
export class OrderProcessComponent implements OnInit{
  coffeeData: any;
  cakeData: any;
  recommendedCake: any;
  coffeePlace: any;
  coffeePlaces: any;
  currentSelectedCoffee: any;
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();

  constructor(private storage: StorageService,
              private service: CoffeeService,
              private cakeService: CakeService) {}

  ngOnInit(): void {
    this.service.getAllCoffees().subscribe(coffee => this.coffeeData = coffee);
    this.cakeService.getCakes().subscribe(cake => this.cakeData = cake);
    this.service.getCoffeePlaces().subscribe(cps => this.coffeePlaces = cps);
  }


  selectButton(coffee: CoffeeModel){
    let btns = document.getElementsByTagName("button");
    // @ts-ignore
    for (let btn of btns){
      btn.classList.remove('selected');
    }
    let selectedBtn = document.getElementById(coffee.id);
    // @ts-ignore
    selectedBtn.classList.add('selected');
    this.currentSelectedCoffee = coffee;
  }

  changeCoffee(coffee: CoffeeModel) {
    this.selectButton(coffee);

    const coffee_filling = document.querySelector(".filling");
    // @ts-ignore
    coffee_filling.classList.remove(this.currentSelectedCoffee.name);

    // @ts-ignore
    coffee_filling.classList.add(coffee.name);
  }


  choosePlace(place: any) {
    this.coffeePlace = place;
    let placeDiv = document.getElementById('placeDiv');
    // @ts-ignore
    placeDiv.style.display = 'none';

    let chooseDiv = document.getElementById('menuCustomBtn');
    // @ts-ignore
    chooseDiv.style.display = 'block';
  }

  showMenu() {
    let chooseDiv = document.getElementById('menuCustomBtn');
    // @ts-ignore
    chooseDiv.style.display = 'none';

    let menuDiv = document.getElementById('menuDiv');
    // @ts-ignore
    menuDiv.style.display = 'block';

    let contentDiv = document.getElementById('content');
    // @ts-ignore
    contentDiv.style.width = '70%';
    // @ts-ignore
    contentDiv.style.marginTop = '10vh';
  }

  buildCustom() {
    let chooseDiv = document.getElementById('menuCustomBtn');
    // @ts-ignore
    chooseDiv.style.display = 'none';
    let buildCustomDiv = document.getElementById('buildCustomDiv');
    // @ts-ignore
    buildCustomDiv.style.display = 'block';
  }

  addCoffeeToOrder(coffee: CoffeeModel) {

  }

  addCakeToOrder(cake: CakeModel) {

  }
}
