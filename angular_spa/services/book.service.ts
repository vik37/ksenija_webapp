import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Book } from '../models/entities/Book';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly APIUrl = '/api';
  readonly PhotoUrl = '/images/books/';
  constructor(private client: HttpClient, private router: Router) { }

  getDomesticBooks(): Observable<Book[]>{
    return this.client.get<Book[]>(this.APIUrl+"/book")
    .pipe(map(res => (res as Book[]).filter(x => x.market === 1)));
  }
  getForeignBooks(): Observable<Book[]>{
    return this.client.get<Book[]>(this.APIUrl+"/book")
    .pipe(map(res => (res as Book[]).filter(x => x.market === 0)));
  }

  getBookById(id:number){
    return this.client.get<Book>(this.APIUrl+"/book"+`/${id}`)
      .pipe(
        map((data:Book)=>{
          return data;
        }),catchError(err => {
          this.router.navigate(['/not-found']);
          return throwError(err);
        })
      )
  }
}
