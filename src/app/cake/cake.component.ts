import {Component, OnInit} from '@angular/core';
import {CakeService} from "../services/cake.service";
import {CakeModel} from "./cake.Model";

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.css'
})
export class CakeComponent implements OnInit{
  data: any;
  cakeBool: boolean = false;

  constructor(private service: CakeService) {
  }

  ngOnInit(): void{
    this.service.getCakes().subscribe(data => this.data = data)
  }

  addCake(addCakeForm: any): void{
    let cake = new CakeModel();
    cake.name = addCakeForm.value.cakeNameInput;
    cake.price = addCakeForm.value.cakePriceInput;

    this.service.addCake(cake).subscribe((response) => {console.log(response);this.ngOnInit()})
  }

  showAddCake(): void{

    if(this.cakeBool == false) {
      let contentToShow = document.getElementById("addCakeDiv");
      // @ts-ignore
      contentToShow.style.display = "block";
      this.cakeBool = true;
    } else {
      let contentToHide = document.getElementById('addCakeDiv');
      // @ts-ignore
      contentToHide.style.display = 'none';
      this.cakeBool = false;

      this.ngOnInit();
    }
  }


  deleteCake(id: string){
      this.service.deleteCake(id).subscribe((response) => {
        console.log(response); this.ngOnInit()});
  }
}
