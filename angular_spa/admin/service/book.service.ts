import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/entities/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly PhotoUrl = '/images/books/';
  readonly APIUrl = '/api';

  constructor(private _client: HttpClient ) { }

  getAllBooks(): Observable<Book[]>{
    return this._client.get<Book[]>(this.APIUrl+"/book")
    .pipe(map(res => (res as Book[])))
  }
  getBookById(id:number): Observable<Book>{
    return this._client.get<Book>(this.APIUrl+"book/"+id)
    .pipe(map(res => (res as Book)));
  }
  addBook(value:Book) : Observable<Book>{
    return this._client.post<Book>(this.APIUrl+"/book/newbook",value);
  }
  updateBook(id:number,book:Book){
    return this._client.put(this.APIUrl+"/book/"+id,book);

  }
  uploadBookPhoto(value:any){
    return this._client.post(this.APIUrl+"/book/uploadphoto",value);
  }
  deleteBook(id:number){
    return this._client.delete(this.APIUrl+'/book/'+id);
  }

}

