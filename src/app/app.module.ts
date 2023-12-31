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
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "./app.routes";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {OrderComponent} from "./order/order.component";
import {TestCComponent} from "./test-c/test-c.component";
import {StorageModule} from "@ngx-pwa/local-storage";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {OrderProcessComponent} from "./order-process/order-process.component";
import {MatIconModule} from "@angular/material/icon";
import {MenuComponent} from "./menu/menu.component";
//import {StorageMap} from "@ngx-pwa/local-storage";




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CoffeeComponent,
    CakeComponent,
    PostComponent,
    IngredientComponent,
    UserComponent,
    TestCComponent,
    OrderComponent,
    ProfileComponent
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
    ReactiveFormsModule,
    StorageModule.forRoot({IDBNoWrap: true}),
    MatInputModule,
    OrderProcessComponent,
    HomeComponent,
    MatIconModule,
    MenuComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
