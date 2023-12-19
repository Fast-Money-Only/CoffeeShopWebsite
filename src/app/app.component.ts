import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {PostComponent} from "./post/post.component";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {RouterLinkActive} from "@angular/router";
import {StorageService} from "./storage.service";
import { Subscription } from "rxjs";
import {UserModel} from "./user/User.Model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'CoffeeShopWeb';
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();

  constructor(private storage: StorageService) {
  }


  ngOnInit() {
    this.navigate('comp5', 'btn5');
    this.setUser();
  }

  navigate(divId: string, btnId: string) {
    //Set alle elemented til ikke active og ikke show content
    //Derefter sæt id-et til active og show
    let components = document.getElementsByClassName("component");
    // @ts-ignore
    for (let div of components) {
      // @ts-ignore
      div.style.display = 'none';
    }
    let divs = document.getElementsByTagName("button");
    // @ts-ignore
    for (let div of divs){
      div.classList.remove('active');
    }
    let divToShow = document.getElementById(divId);
    let btnToActivate = document.getElementById(btnId);
    // @ts-ignore
    divToShow.style.display = 'block';
    // @ts-ignore
    btnToActivate.classList.add('active');

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
    this.storage.delete('user').subscribe(() => {console.log('Removed');document.location.reload()});
  }


  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

    protected readonly document = document;
}
