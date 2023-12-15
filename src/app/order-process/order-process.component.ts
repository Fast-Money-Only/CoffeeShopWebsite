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
import {ProductModel} from "./product.Model";
import {MatIconModule} from "@angular/material/icon";
import {OrderModel} from "../order/order.Model";
import {inputNames} from "@angular/cdk/schematics";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {IngredientService} from "../services/ingredient.service";
import {IngredientModel} from "../ingredient/ingredient.Model";

@Component({
  selector: 'app-order-process',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-process.component.html',
  styleUrl: './order-process.component.css'
})
export class OrderProcessComponent implements OnInit{
  coffeeData: any;
  cakeData: any;
  ingredientData: any;
  lastAddedFill: string = 'bottomOfCup';
  recommendedCake: any;
  selectedCoffeePlace: any;
  selectedCup!: string;
  coffeePlaces: any;
  customPrice: number = 25;
  total: number = 0;
  ingredientsToAdd: IngredientModel[] = [];
  productsToAdd: ProductModel[] = [];
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();

  constructor(private storage: StorageService,
              private service: CoffeeService,
              private cakeService: CakeService,
              private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.service.getAllCoffees().subscribe(coffee => this.coffeeData = coffee);
    this.cakeService.getCakes().subscribe(cake => this.cakeData = cake);
    this.service.getCoffeePlaces().subscribe(cps => this.coffeePlaces = cps);
    this.ingredientService.getIngredients().subscribe(ingr => this.ingredientData = ingr);

  }


  choosePlace(place: any) {
    this.selectedCoffeePlace = place;
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
    let setCupDiv = document.getElementById('drinkCategory');
    // @ts-ignore
    setCupDiv.style.display = 'block';
  }

  addCoffeeToOrder(coffee: CoffeeModel) {
    let product: ProductModel = new ProductModel();
    product.ProductName = coffee.name;
    product.ProductNumber = coffee.id;
    product.ProductPrice = coffee.price;
    this.productsToAdd.push(product);
    this.total = this.total + coffee.price;

    setTimeout(function () {
      let productDiv = document.getElementById("productDiv")
      // @ts-ignore
      productDiv.scrollTop = productDiv.scrollHeight;
    }, 100);
  }

  addCakeToOrder(cake: CakeModel) {
    let product: ProductModel = new ProductModel();
    product.ProductName = cake.name;
    product.ProductNumber = cake.id;
    product.ProductPrice = cake.price;
    this.productsToAdd.push(product);
    this.total = this.total + cake.price;

    setTimeout(function () {
      let productDiv = document.getElementById("productDiv")
      // @ts-ignore
      productDiv.scrollTop = productDiv.scrollHeight;
    }, 100);

  }

  removeProduct(Id: string) {
    this.productsToAdd = this.productsToAdd.filter(item => item.ProductId !== Id);
  }


  createOrder() {
    let ordre = new OrderModel();
    ordre.userId = this.currentUser.id;
    ordre.coffeePlaceId = this.selectedCoffeePlace.id;

  }


  setCup(cup: string) {
    this.selectedCup = cup;
    let drinkDiv = document.getElementById('drinkCategory');
    // @ts-ignore
    drinkDiv.style.display = 'none';
    let buildCustomDiv = document.getElementById('buildCustomDiv');
    // @ts-ignore
    buildCustomDiv.style.display = 'block';

    let contentDiv = document.getElementById('content');
    // @ts-ignore
    contentDiv.style.width = '70%';
    // @ts-ignore
    contentDiv.style.marginTop = '10vh';
  }

  onCheck(event: any, ingredient: IngredientModel) {
    let nyPris = this.customPrice;

    // @ts-ignore
    if (event.checked === false) {
      this.ingredientsToAdd = this.ingredientsToAdd.filter(item => item.id !== ingredient.id);
      nyPris = nyPris - 2;
    } else {
      this.ingredientsToAdd.push(ingredient);
      nyPris = nyPris + 2;

    }
    this.customPrice = nyPris;
  }

  createFill(ingredient: IngredientModel){
    let newDiv = document.createElement("div");
    let newId = ingredient.name + 'fillDiv';
    newDiv.id = newId;
    newDiv.classList.add('fill');
    newDiv.style.height = '20%';

    if (ingredient.name == 'Espresso'){
      newDiv.style.backgroundColor = '';
    }

    const currentDiv = document.getElementById(this.lastAddedFill);

    // @ts-ignore
    newDiv.style.bottom = currentDiv.style.height;

    document.body.insertBefore(newDiv, currentDiv);

    this.lastAddedFill = newId;
  }
}
