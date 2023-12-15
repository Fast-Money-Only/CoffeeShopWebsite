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
  recommendedCake: any;
  selectedCoffeePlace: any;
  coffeePlaces: any;
  total: number = 0;
  productsToAdd: ProductModel[] = [];
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
}
