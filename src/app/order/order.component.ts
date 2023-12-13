import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderModel} from "./order.Model";
import {OrderProductModel} from "./orderProduct.Model";

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
  products: any;
  selectedPlace!: string;


  constructor(private service: OrderService) {
  }

  ngOnInit(): void {
    this.service.getOrders().subscribe(data => this.data = data);
    this.service.getPending().subscribe(pendingData => this.pendingData = pendingData);
    this.service.getDone().subscribe(doneData => this.doneData = doneData);
    this.service.getCoffeePlaces().subscribe(coffeePlaces => this.coffeePlaces = coffeePlaces);
  }


    showProducts(id: string) {
      let contentTohide = document.getElementsByClassName("content");
      // @ts-ignore
      for (let content of contentTohide) {
        // @ts-ignore
        content.style.display = 'none';
      }
      this.getProductsFromOrder(id);
      let contentToShow = document.getElementById(id + "content");
      // @ts-ignore
      contentToShow.style.display = "block";
    }

    getProductsFromOrder(id: string){
      this.service.getOrderProducts(id).subscribe(products => this.products = products);
    }


  moveToDone(order: OrderModel) {
    order.isDone = true;
    this.service.updateOrder(order.id, order)
        .subscribe((response) => {console.log(response); this.ngOnInit()});
  }
}
