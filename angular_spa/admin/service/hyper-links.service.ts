import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hyperlink } from 'src/app/models/entities/Hyperlinks';
import { Article } from 'src/app/models/entities/Article';


@Injectable({
  providedIn: 'root'
})
export class HyperLinksService {
  readonly APIUrl = '/api';

  constructor(private _client: HttpClient) { }

  getAllLinksByBookId(bookId: number): Observable<Article[]>{
    return this._client.get<Article[]>(this.APIUrl+"/book/"+bookId+"hyperlink")
    .pipe(map(res => res as Article[]));
  }
  postLink(value: Hyperlink, bookId: number): Observable<Hyperlink>{
    return this._client.post<Hyperlink>(this.APIUrl+"/book/"+bookId+"/hyperlink/",value);
  }
  deleteLink(bookId: number | undefined, linkId: number){
    return this._client.delete(this.APIUrl+"/book/"+bookId+"/hyperlink/"+linkId);
  }
}
