import { Component, OnInit, OnDestroy, Output,  } from '@angular/core';
import { Book } from 'src/app/models/entities/Book';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/admin/service/book.service';
import { Market } from 'src/app/models/enums/Market';
import { Hyperlink } from 'src/app/models/entities/Hyperlinks';
declare var bootbox:any;

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.css']
})
export class ChangeBookComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  books: Book[] = [];
  @Output() bookId!:number;
  @Output() hpLinks: Hyperlink[] = [];
  public viewMarket = Market;
  @Output() displayLinks:boolean = true;
  @Output() displayUpdateBook:boolean = true;
  @Output() book!: Book;
  constructor(private _service: BookService) { }

  ngOnInit(): void {
    this.refreshBook();
  }

  refreshBook(){
    this._service.getAllBooks().subscribe((data)=>{
      this.books = data;
    });
  }
  toogleLinks(bookId:number){
    this.displayLinks = false;
    this.hpLinks = this.books.find(x => x.id === bookId)!.links;
    this.bookId = bookId;
  }
  toogleUpdate(book:Book){
    this.book = book;
    this.displayUpdateBook = false;
  }
  fromChangeLinks(value:boolean){
    this.displayLinks = value;
  }
  fromUpdateBook(val:boolean){
    this.displayUpdateBook = val;
    this.refreshBook();
  }
  removeBook(id:number){
    const book = this.books.find(x => x.id === id);
    bootbox.confirm({
      size:"lg",
      title:`Delete Book - ${book?.name.bold().toUpperCase()}`,
      message: "Are you sure?",
      className:'some-class',
      centerVertical: true,
      buttons:{
        confirm:{
          size:"lg",
          label:"Yes",
          className: 'btn-danger'
        },
        cancel: {
          label: 'No',
          className: 'btn-dark'
        }
      },
      callback: (result:boolean)=>{
        if(result){
          this.books = this.books.filter(x => x.id !== id);
          this._service.deleteBook(id).subscribe();
        }
      }
    })
    .find('.modal-content')
    .css({'background': 'radial-gradient(circle,rgba(166,11,14,0.8774860285911239) 0%, rgba(106,22,22,0.89976) 17%)',
        'color':'rgb(255, 255, 232)','font-weight':'800','text-align':'center','letter-spacing':'1.8px'});
  }
  ngOnDestroy(): void{
    this._subscription.unsubscribe();
  }
}
