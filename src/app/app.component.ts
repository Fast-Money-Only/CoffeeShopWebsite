import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {PostComponent} from "./post/post.component";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'CoffeeShopWeb';

  ngOnInit() {
    this.navigate('comp5', 'btn5');
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

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
