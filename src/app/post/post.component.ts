import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {MatButtonModule} from "@angular/material/button";
import {PostModel} from "./post.Model";
import {UserModel} from "../user/User.Model";
import {StorageService} from "../storage.service";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  data: any;
  user:  any;
  userFromPost: any;
  currentUser: UserModel = new UserModel();
  subscription: Subscription = new Subscription();


  constructor(private service: PostService,
              private storage: StorageService) {
  }

  ngOnInit(): void {
    this.service.getPosts().subscribe(data => this.data = data);
    console.log(this.data);
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


  showAddPost() {
    const div = document.getElementById('addPost');
    const btn = document.getElementById('addBtn');
    // @ts-ignore
    if (div.style.display != 'block') {
      // @ts-ignore
      div.style.display = 'block';
      // @ts-ignore
      btn.textContent = 'X';
    } else {
      // @ts-ignore
      div.style.display = 'none';
      // @ts-ignore
      btn.textContent = '+';
    }
  }

  onSubmit(postForm: any) {
    let post :PostModel = new PostModel();
    post.title = postForm.value.name;
    post.img = postForm.value.img;
    post.userID = this.currentUser.id;
    console.log(post);

    this.service.addPost(post)
        .subscribe((response) =>
        {console.log(response); this.ngOnInit()});
  }

}
