import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderModel} from "./order.Model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  data: any;
  pendingData: any;
  doneData: any;
  coffeePlaces: any;
  selectedPlace!: string;


  constructor(private service: OrderService) {
  }

  ngOnInit(): void {
    this.service.getOrders().subscribe(data => this.data = data);
    this.service.getPending().subscribe(pendingData => this.pendingData = pendingData);
    this.service.getDone().subscribe(doneData => this.doneData = doneData);
    this.service.getCoffeePlaces().subscribe(coffeePlaces => this.coffeePlaces = coffeePlaces);
  }


}
