import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookComment } from '../models/entities/BookComment';

@Injectable({
  providedIn: 'root'
})
export class BookCommentService {
  readonly APIUrl = '/api';
  constructor(private client: HttpClient) { }

  getBookCommentByUsername(bookId:number, username:string): Observable<BookComment[]>{
    return this.client.get<BookComment[]>(this.APIUrl+'/user/'+username+'/book/'+bookId+'/bookcomment')
    .pipe(map((res)=>  (res as BookComment[])));
  }
  postBookComment(bookId:number, username:string,comment:BookComment): Observable<BookComment>{
    return this.client.post<BookComment>(
      this.APIUrl+'/user/'+username+'/book/'+bookId+'/bookcomment/addcomment',comment);
  }
  removeBookComment(bookId:number,username:string,bookCommentId:number){
    return this.client.delete(this.APIUrl+'/user/'+username+'/book/'+bookId+'/bookcomment/remove/'+
                              bookCommentId);
  }
}
