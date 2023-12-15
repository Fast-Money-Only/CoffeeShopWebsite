import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";
import {UserModel} from "./User.Model";
import { StorageMap } from '@ngx-pwa/local-storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {NavigationExtras} from "@angular/router";

//import {IngredientModel} from "../ingredients/Ingredient.Model";
//import {valueOf} from "jasmine";

import {MembershipModel} from "../membership/Membership.Model";
import {StorageService} from "../storage.service";
import {AppComponent} from "../app.component";
import {catchError, empty, map, Observable, of} from "rxjs";



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


  constructor(private service: UserService, private storage: StorageService,private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(data => this.data = data);
  }


  showCreateUser(): void {
    let contentToHide = document.getElementById("example");
    // @ts-ignore
    contentToHide.style.display = 'none';


    let contentToShow = document.getElementById("createUserDiv");
    // @ts-ignore
    contentToShow.style.display = "block";
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

      this.service.loginUser(Email, Password).subscribe(currentUser => {this.currentUser = currentUser; console.log('WORKS');this.storage.set('user', this.currentUser).subscribe(() => {console.log('User data saved in storage');
      this.router.navigate(['../test-c']); document.location.reload()})},
          (error) =>{console.error('Error here:', error);
      })
    //this.storage.set('user', this.currentUser).subscribe(() => {console.log('User data saved in storage');});
  }

  loginFromCreation(email:string, password:string): void{
    this.service.loginUser(email,password).subscribe(currentUser => {this.currentUser = currentUser; console.log('WORKS');this.storage.set('user', this.currentUser).subscribe(() => {console.log('User data saved in storage');
        this.router.navigate(['../test-c']); document.location.reload()})},
      (error) =>{console.error('Error here:', error);
      })
  }


  logout(): void{
    this.storage.delete('user').subscribe(() => {console.log('Removed')});
  }



  // protected readonly valueOf = valueOf;

  createUser(createUserForm: NgForm) {
    let user = new UserModel();
    let membership = new MembershipModel();
    membership.id = '4d07ca7e-aa29-456f-8808-27ea0dcfe096';
    user.firstname = createUserForm.value.userFirstName;
    user.lastname = createUserForm.value.userLastName;
    user.phone = createUserForm.value.userPhone;
    user.email = createUserForm.value.userEmail;
    user.password = createUserForm.value.userPassword;
    user.membership = membership;
    console.log(user);

    this.doesUserExist(createUserForm.value.userEmail).subscribe(
      (exists: boolean) => {
        if (!exists) {
          this.service.createUser(user).subscribe(
            (response) => {
              console.log(response);
              this.loginFromCreation(createUserForm.value.userEmail,createUserForm.value.userPassword);
              this.ngOnInit();
            },
            (error) => {
              console.log("ERROR CREATING USER", error);
            }
          );
        } else {
          console.log("User already exists");
        }
      },
      (error) => {
        console.log("Error checking user existence", error);
      }
    );
  }

  doesUserExist(email: string): Observable<boolean> {
    return this.service.doesUserExist(email).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        if (error.status === 404) {
          return of(false);
        } else {
          console.log("Error checking user existence", error);
          return of(false);
        }
      })
    );
  }



  protected readonly empty = empty;
  protected readonly document = document;
}
