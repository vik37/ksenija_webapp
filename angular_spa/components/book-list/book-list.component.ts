import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/models/enums/Genre';
import { Book } from '../../models/entities/Book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  loading:boolean = true;
  domesticBooks: Book[] = [];
  foreignBooks: Book[] = [];
  subscription = new Subscription();
  genre = Genre;
  bookImgUrl:string = "";
  emptyBookImgUrl:string = "";
  username:string | null | undefined;
  constructor(private _bookService: BookService, private _activeRoute: ActivatedRoute) { }
  onLoad(): void{
    this.loading = false;
  }
  ngOnInit(): void {
    this.refreshForeignBookList();
    this.refreshDomesticBookList();
    this.username = this.isUserAuthenticated()?
                      this._activeRoute.snapshot.paramMap.get('username') : "";
  }
  refreshDomesticBookList(){
    this._bookService.getDomesticBooks().subscribe(data =>{
      this.domesticBooks = data;
      this.bookImgUrl = this._bookService.PhotoUrl;
      this.emptyBookImgUrl = this._bookService.PhotoUrl+"unnamed.png";
    });
  }
  refreshForeignBookList(){
    this._bookService.getForeignBooks().subscribe(data =>{
      this.foreignBooks = data;
      this.bookImgUrl = this._bookService.PhotoUrl;
      this.emptyBookImgUrl = this._bookService.PhotoUrl+"unnamed.png";
    });
  }
  isUserAuthenticated(): boolean{
    const token: string | null = localStorage.getItem('jwt');
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
