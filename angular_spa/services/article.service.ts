import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Article } from '../models/entities/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly APIUrl = '/api';
  readonly PhotoUrl = '/images/articles/';

  constructor(private client: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.client.get<Article[]>(this.APIUrl+'/article')
    .pipe(map(res => (res as Article[])));
  }
}
