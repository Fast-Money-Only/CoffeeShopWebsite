import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CakeService} from "../services/cake.service";
import {CoffeeService} from "../services/coffee.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  coffeeData: any;
  cakeData: any;

  constructor(private cakeService: CakeService,
              private coffeeService: CoffeeService) {
  }

  ngOnInit(): void {
    this.coffeeService.getAllCoffees().subscribe(coffee => this.coffeeData = coffee);
    this.cakeService.getCakes().subscribe(cake => this.cakeData = cake);
  }

}
