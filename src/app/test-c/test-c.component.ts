import { Component, OnDestroy } from '@angular/core';
import { UserModel } from "../user/User.Model";
import { StorageService } from "../storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-test-c',
  templateUrl: './test-c.component.html',
  styleUrls: ['./test-c.component.css']
})
export class TestCComponent implements OnDestroy{
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();

  constructor(private storage: StorageService) {}

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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
