import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/admin/user-entity/user-model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl = '/api';

  constructor(private _client: HttpClient) { }

  getAllUsers(): Observable<UserModel[]>{
    return this._client.get<UserModel[]>(this.APIUrl+'/user').pipe(
      map((data) => { return data as UserModel[]})
    )
  }
  deleteUser(username:string){
    return this._client.delete(this.APIUrl+'/user/remove/'+username);
  }
}
