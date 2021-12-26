import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Contact } from '../models/entities/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly APIUrl = '/api';
  constructor(private client: HttpClient) { }

  addContact(contact:Contact): Observable<Contact>{
    return this.client.post<Contact>(this.APIUrl+"/contact",contact).pipe(
      map((res)=>{
        return res;
      })
    )
  }
}
