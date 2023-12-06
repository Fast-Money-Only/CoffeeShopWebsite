import {Component, OnInit} from '@angular/core';
import {CakeService} from "../services/cake.service";

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.css'
})
export class CakeComponent implements OnInit{
  data: any;

  constructor(private service: CakeService) {
  }

  ngOnInit(): void{
    this.service.getCakes().subscribe(data => this.data = data)
  }
}
