import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit {
  books: number[] = [];
  loading:boolean=true;
  constructor() { }
  onLoad(): void{
    this.loading = false;
  }
  ngOnInit(): void {
    this.addNumbers();
  }
  addNumbers(){
      for(let i = 1;i <=6;i++){
        this.books.push(i);
      }
  }
}
