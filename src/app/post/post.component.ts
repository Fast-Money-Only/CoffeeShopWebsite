import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
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
}
