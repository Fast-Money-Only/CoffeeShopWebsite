import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { CakeComponent } from './cake/cake.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { PostComponent } from './post/post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatCardActions} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "./app.routes";
import {AdminComponent} from "./admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CoffeeComponent,
    CakeComponent,
    PostComponent,
    IngredientComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
