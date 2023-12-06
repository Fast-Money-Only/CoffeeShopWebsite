import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {PostModel} from "./post.Model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  data: any;
  user:  any;


  constructor(private service: PostService) {
  }

  ngOnInit(): void {
    this.service.getPosts().subscribe(data => this.data = data);
    console.log(this.data);
  }

  showAddPost() {
    var div = document.getElementById('addPost');
    // @ts-ignore
    div.style.display = 'block';
  }

  onSubmit(postForm: any) {
    let post :PostModel = new PostModel();
    post.title = postForm.value.name;
    post.img = postForm.value.img; //Skal rettes
    post.userID = "4d07ca7e-aa29-456f-8808-27ea0dcfe096";//hard coded to check login
    console.log(post);
    /*
    this.service.addPost(post)
        .subscribe((response) =>
        {console.log(response), this.ngOnInit()});*/
  }
}
