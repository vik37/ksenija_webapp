import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BookLike } from '../models/entities/BookLike';

@Injectable({
  providedIn: 'root'
})
export class BookLikeService {

  readonly APIUrl = '/api';

  constructor(private client: HttpClient) { }

  postBookLike(bookId:number, username:string,bookLike:BookLike): Observable<BookLike>{
    return this.client.post<BookLike>(
      this.APIUrl+'/user/'+username+'/book/'+bookId+'/booklike',bookLike);
  }
  putBookLike(bookId:number, username:string,id:number,
              bookLike:BookLike){
    return this.client.put(this.APIUrl+username+'/user//book/'+bookId+'/booklike/'+id,bookLike);
  }
}
