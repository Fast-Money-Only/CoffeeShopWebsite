import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CoffeeService} from "../services/coffee.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.css'
})
export class CoffeeComponent implements OnInit{
  data: any;

  constructor(private service: CoffeeService) {
  }
  ngOnInit(): void {
    this.service.getAllCoffees().subscribe(data => this.data = data);
  }
}
