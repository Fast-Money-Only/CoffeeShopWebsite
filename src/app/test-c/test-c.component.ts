import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserModel } from "../user/User.Model";
import { StorageService } from "../storage.service";
import { Subscription } from "rxjs";
import {CoffeeService} from "../services/coffee.service";
import {CoffeeModel} from "../coffee/coffee.Model";

@Component({
  selector: 'app-test-c',
  templateUrl: './test-c.component.html',
  styleUrls: ['./test-c.component.css']
})
export class TestCComponent implements OnDestroy, OnInit{
  data: any;
  coffeePlace: any;
  coffeePlaces: any;
  currentSelectedCoffee: any;
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();

  constructor(private storage: StorageService,
              private service: CoffeeService) {}

    ngOnInit(): void {
        this.service.getAllCoffees().subscribe(data => this.data = data);
        this.service.getCoffeePlaces().subscribe(cps => this.coffeePlaces = cps);
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    }

    buildCustom() {
        let chooseDiv = document.getElementById('menuCustomBtn');
        // @ts-ignore
        chooseDiv.style.display = 'none';
        let buildCustomDiv = document.getElementById('buildCustomDiv');
        // @ts-ignore
        buildCustomDiv.style.display = 'block';
    }
}
