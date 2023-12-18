import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, NgForm, Validators} from "@angular/forms";
import {StorageService} from "../storage.service";
import {UserModel} from "../user/User.Model";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {OrderService} from "../services/order.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();
  orders: any;
  products: any;
  price: number = 0;



  constructor(private storage: StorageService,
              private service: UserService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.setUser();
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

  logout(): void{
    this.storage.delete('user').subscribe(() => {console.log('Removed')});
  }

  deleteUser(id: string): void{
    this.service.deleteUser(id).subscribe((response) => {console.log(response);this.logout();document.location.reload()})
  }

  updateUser(userForm: NgForm) {
    let userToUpdate = this.currentUser;

    if (userForm.value.firstname != ''){
      userToUpdate.firstname = userForm.value.firstname;
    }
    if (userForm.value.lastname != ''){
      userToUpdate.lastname = userForm.value.lastname;
    }
    if (userForm.value.phonenr != ''){
      userToUpdate.phone = userForm.value.phonenr;
    }
    if (userForm.value.mail != ''){
      userToUpdate.email = userForm.value.mail;
    }

    this.service.updateUser(userToUpdate.id,userToUpdate).subscribe((response) =>
    {console.log(response), this.ngOnInit()});

  }

  updatePassword(passwordForm: NgForm) {
    let userToUpdate = this.currentUser;
    console.log(userToUpdate);
    if (passwordForm.value.password != '' && passwordForm.value.repeatedPassword != ''){
      if (passwordForm.value.password == passwordForm.value.repeatedPassword){
        userToUpdate.password = passwordForm.value.password;
        console.log(userToUpdate);
        /*this.service.updateUser(userToUpdate.id,userToUpdate).subscribe((response) =>
        {console.log(response), this.ngOnInit()});*/
      }else {
        let inputRepeated = document.getElementById('repeated');
        console.log('Passwords dont match');
      }
    }
  }

  showProducts(id: string) {
    let contentToHide = document.getElementsByClassName("cont");
    // @ts-ignore
    for (let content of contentToHide) {
      // @ts-ignore
      content.style.display = 'none';
    }
    this.getProductsFromOrder(id);
    let contentToShow = document.getElementById(id + "cont");
    // @ts-ignore
    contentToShow.style.display = "block";
  }

  getProductsFromOrder(id: string){
    this.price = 0;
    this.orderService.getOrderProducts(id).subscribe(products => this.products = products);
    for (let product of this.products){
      this.price = this.price + product.ProductPrice;
    }
  }

  seKvitteringer() {
    this.orderService.getUserOrders(this.currentUser.id).subscribe(orders => this.orders = orders);
  }
}
