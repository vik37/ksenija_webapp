import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/admin/service/book.service';
import { Book } from 'src/app/models/entities/Book';


@Component({
  selector: 'app-book-private',
  templateUrl: './book-private.component.html',
  styleUrls: ['./book-private.component.css']
})
export class BookPrivateComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  titlePage?:string = "Change Book";
  addOrUpdate:boolean = false;
  formData = new FormData();

  constructor(private _service: BookService) { }

  ngOnInit(): void {
  }
  changeToUpdate(){
    this.addOrUpdate=false;
    this.titlePage = "Change Book";
  }
  changeToAdd(){
    this.addOrUpdate = true;
    this.titlePage = "Add Book";
  }
  addBook(book:Book){
    console.log(book);
    this._service.addBook(book).subscribe();
    this._service.uploadBookPhoto(this.formData).subscribe();
  }
  getFormData(value:FormData){
    this.formData = value;
  }
  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
