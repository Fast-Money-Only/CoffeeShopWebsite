import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";
import {UserModel} from "./User.Model";

//import {IngredientModel} from "../ingredients/Ingredient.Model";
//import {valueOf} from "jasmine";

import {MembershipModel} from "../membership/Membership.Model";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  data: any;
  userData: any;
  userOrdersData: any;
  currentUser: any;

  constructor(private service: UserService) {
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(data => this.data = data);
  }

  getUser(id: string): void {
    this.service.getUser(id).subscribe(userData => this.userData = userData);
  }


  findUserOrders(findUserOrdersForm: any) {
    this.getUser(findUserOrdersForm.value.name);
    this.service.getUserOrders(findUserOrdersForm.value.name)
      .subscribe(userOrdersData => this.userOrdersData = userOrdersData);
  }


  loginUser(loginUserForm: NgForm) {

    // @ts-ignore
    let Email = document.getElementById("email").value;
    // @ts-ignore
    let Password = document.getElementById("password").value;

    this.service.loginUser(Email, Password).subscribe(currentUser => {this.currentUser = currentUser; console.log('WORKS')}, (error) =>{console.error('Error here:', error);})
    //this.service.loginUser(em,pass).subscribe((response) => {console.log(response)})
  }


  // protected readonly valueOf = valueOf;

  createUser(createUserForm: any) {
    let user = new UserModel();
    let membership = new MembershipModel();
    membership.id = '4d07ca7e-aa29-456f-8808-27ea0dcfe096';
    user.firstname = createUserForm.value.fname;
    user.lastname = createUserForm.value.lname;
    user.phone = createUserForm.value.telnr;
    user.email = createUserForm.value.mail;
    user.password = createUserForm.value.kode;
    user.membership = membership;
    console.log(user);

    this.service.createUser(user).subscribe((response) =>
    {console.log(response), this.ngOnInit()});
  }
}
