import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { TestCComponent} from "./test-c/test-c.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  { path: 'test-c', component: TestCComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
