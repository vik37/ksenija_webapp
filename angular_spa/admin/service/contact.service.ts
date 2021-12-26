import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Contact } from 'src/app/models/entities/Contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly APIUrl = '/api';

  constructor(private _client: HttpClient) { }

  getAllContacts(): Observable<Contact[]>{
    return this._client.get<Contact[]>(this.APIUrl+'/contact')
          .pipe(map(res=>(res as Contact[])));
  }
  removeContact(id:number){
    return this._client.delete(this.APIUrl+'/contact/'+id);
  }
}
