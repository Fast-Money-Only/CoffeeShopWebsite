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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {IngredientService} from "../services/ingredient.service";
import {IngredientModel} from "../ingredient/ingredient.Model";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {OrderService} from "../services/order.service";
import {OrderProductModel} from "./orderProduct.Model";
import {CoffeePlaceModel} from "../coffee-place/CoffeePlace.Model";

@Component({
  selector: 'app-order-process',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule
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
  selectedCoffeePlace: CoffeePlaceModel = new CoffeePlaceModel();
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
              private ingredientService: IngredientService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.service.getAllCoffees().subscribe(coffee => this.coffeeData = coffee);
    this.cakeService.getCakes().subscribe(cake => this.cakeData = cake);
    this.service.getCoffeePlaces().subscribe(cps => this.coffeePlaces = cps);
    this.ingredientService.getIngredients().subscribe(ingr => this.ingredientData = ingr);
    this.setUser();
  }



  choosePlace(place: CoffeePlaceModel) {
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
    product.Price = coffee.price;
    this.productsToAdd.push(product);
    this.total = this.total + coffee.price;

    setTimeout(function () {
      let productDiv = document.getElementById("productDiv")
      // @ts-ignore
      productDiv.scrollTop = productDiv.scrollHeight;
    }, 100);

    this.service
        .getRecommendedCake(coffee.id)
        .subscribe(recommendedCake => this.recommendedCake = recommendedCake);
    let recmdDiv = document.getElementById('recommendedDiv');
    // @ts-ignore
    recmdDiv.style.display = 'block';

    setTimeout(function () {
      // @ts-ignore
      recmdDiv.style.display = 'none';
    }, 10000);
  }

  addCakeToOrder(cake: CakeModel) {
    let product: ProductModel = new ProductModel();
    product.ProductName = cake.name;
    product.ProductNumber = cake.id;
    product.Price = cake.price;
    this.productsToAdd.push(product);
    this.total = this.total + cake.price;

    setTimeout(function () {
      let productDiv = document.getElementById("productDiv")
      // @ts-ignore
      productDiv.scrollTop = productDiv.scrollHeight;
    }, 100);

  }

  setUser() {
    this.subscription = this.storage.get('user').subscribe((user: UserModel) => {
      if (user) {
        this.currentUser = user;
        console.log('Retrieved User:', this.currentUser);
      } else {
        console.log('User not found in storage');
      }
    });
  }

  removeProduct(product: ProductModel) {
    this.productsToAdd = this.productsToAdd.filter(item => item.ProductId !== product.ProductId);
    // @ts-ignore
    let oldValue: HTMLInputElement = document.getElementById(product.ProductId + 'quantity');
    this.total = this.total - (product.Price * Number(oldValue.getAttribute("previousValue")));

  }


  createOrder() {
    let ordre = new OrderModel();
    let coffeePlace: CoffeePlaceModel;
    coffeePlace = this.selectedCoffeePlace;

    ordre.userId = this.currentUser.id;
    ordre.coffeePlaceId = coffeePlace.coffeePlaceId;
    // @ts-ignore
    let pickupInput: HTMLInputElement = document.getElementById('pickupInput');
    ordre.pickup = pickupInput.value.toString().slice(0, 19).replace('T', ' ');

    console.log("Hello")
    this.orderService.addOrder(ordre).subscribe((response) => {console.log(response)});

    for (let product of this.productsToAdd){

      console.log(product);

      this.orderService.addProduct(product).subscribe((response) => {console.log(response)});
      // @ts-ignore
      let quantity: HTMLInputElement = document.getElementById(product.ProductId + 'quantity');
      let orderProduct = new OrderProductModel();
      orderProduct.orderId = ordre.id;
      orderProduct.productId = product.ProductId;
      orderProduct.quantity = Number(quantity.value);

      this.orderService.addOrderProducts(orderProduct).subscribe((response) => {console.log(response)});
      document.location.reload();
    }
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

    if (!event.checked) {
      this.ingredientsToAdd = this.ingredientsToAdd.filter(item => item.id !== ingredient.id);
      nyPris = nyPris - 2;
      this.removeFill(ingredient);
    } else {
      this.ingredientsToAdd.push(ingredient);
      nyPris = nyPris + 2;
      this.createFill(ingredient);
    }
    this.customPrice = nyPris;


  }

  createFill(ingredient: IngredientModel){
    const newDiv = document.createElement("div");
    let newId = ingredient.id + 'fillDiv';
    newDiv.id = newId;
    newDiv.classList.add('fill');
    newDiv.style.height = '20%';
    newDiv.style.background = '#6F4E37';

    if (ingredient.name == 'Espresso'){
      newDiv.style.backgroundColor = '#6F4E37';
    }

    if (ingredient.name == 'Water'){
      newDiv.style.backgroundColor = '#D4F1F9';
    }

    if (ingredient.name == 'Foamed milk'){
      newDiv.style.backgroundColor = 'white';

    }

    if (ingredient.name == 'Milk'){
      newDiv.style.backgroundImage = 'linear-gradient(#D4Ac82, white)';
    }

    if (ingredient.name == 'Caramel Syrup'){
      newDiv.style.backgroundColor = '#FFD59A';
      newDiv.style.height = '5%';
    }

    if (ingredient.name == 'Chocolate Syrup'){
      newDiv.style.backgroundColor = '#7B3F00';
      newDiv.style.height = '5%';
    }

    if (ingredient.name == 'Whiskey'){
      newDiv.style.backgroundColor = '#E38200';
      newDiv.style.height = '15%';
    }

    if (ingredient.name == 'Bailey'){
      newDiv.style.backgroundColor = '#D5A777';
      newDiv.style.height = '15%';
    }

    if (ingredient.name == 'Ice cubes'){
      newDiv.style.height = '0';
    }

    const currentDiv = document.getElementById(this.lastAddedFill);


    // @ts-ignore
    document.getElementById('fillingDiv').insertBefore(newDiv, currentDiv);


    this.lastAddedFill = newId;
  }

  removeFill(ingredient: IngredientModel){
    // @ts-ignore
    document.getElementById(ingredient.id + 'fillDiv').style.display = 'none';
  }

  goBack(hide: string, show: string){
    let showDiv = document.getElementById(show);
    let hideDiv = document.getElementById(hide);

    // @ts-ignore
    showDiv.style.display = 'block';

    // @ts-ignore
    hideDiv.style.display = 'none';
  }

  changeQuantity(product: ProductModel, quantityValue: string) {
    if (quantityValue == '0'){
      this.removeProduct(product)
    }


    // @ts-ignore
    let oldValue: HTMLInputElement = document.getElementById(product.ProductId + 'quantity');
    console.log('gammel værdi: ' + oldValue.getAttribute("previousValue"));

    let newValue = Number(quantityValue);
    console.log('ny værdi: ' + newValue);


    if (newValue > Number(oldValue.getAttribute("previousValue"))){
      console.log('højere')
      this.total = this.total - (product.Price * (Number(quantityValue) - 1));
      this.total = this.total + (product.Price * Number(quantityValue));
    }else {
      this.total = this.total - (product.Price * Number(quantityValue));
      console.log('lavere')
    }

    oldValue.setAttribute("previousValue", quantityValue);
  }
}
