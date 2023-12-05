import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  navigate(divId: string, btnId: string) {
    //Set alle elemented til ikke active og ikke show content
    //Derefter sæt id-et til active og show
    let components = document.getElementsByClassName("admincomponent");
    // @ts-ignore
    for (let div of components) {
      // @ts-ignore
      div.style.display = 'none';
    }
    let divs = document.getElementsByClassName("adminbutton");
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
}
