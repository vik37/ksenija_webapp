import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Article } from '../../models/entities/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly APIUrl = '/api';
  readonly PhotoUrl = '/images/articles/';

  constructor(private _client: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this._client.get<Article[]>(this.APIUrl+'/article')
    .pipe(map(res => (res as Article[])));
  }
  addArticle(article:Article) : Observable<Article>{
    return this._client.post<Article>(this.APIUrl+"/article",article);
  }
  uploadArticlePhoto(value:any){
    return this._client.post(this.APIUrl+"/article/photo",value)
  }
  removeArticle(value:number){
    return this._client.delete(this.APIUrl+'/article/'+value);
  }
}

