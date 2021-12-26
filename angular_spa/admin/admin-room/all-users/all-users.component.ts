import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/admin/service/user.service';
import { UserModel } from 'src/app/admin/user-entity/user-model';
import { Subscription } from 'rxjs';
declare var bootbox:any;
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  users:UserModel[]=[];
  private _subscription = new Subscription();

  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void{
    this._userService.getAllUsers().subscribe((res)=>{
      this.users = res;
    });
  }
  removeUser(username:string): void{
    bootbox.confirm({
      size:"lg",
      title:`Delete Book - ${username.bold().toUpperCase()}`,
      message: "Are you sure?",
      className:'some-class',
      centerVertical: true,
      buttons:{
        confirm:{
          size:"lg",
          label:"Yes",
          className: 'btn-danger'
        },
        cancel: {
          label: 'No',
          className: 'btn-dark'
        }
      },
      callback: (result:boolean)=>{
        if(result){
          this.users = this.users.filter(x => x.username !== username);
          this._userService.deleteUser(username).subscribe();
        }
      }
    })
    .find('.modal-content')
    .css({'background': 'radial-gradient(circle,rgba(166,11,14,0.8774860285911239) 0%, rgba(106,22,22,0.89976) 17%)',
        'color':'rgb(255, 255, 232)','font-weight':'800','text-align':'center','letter-spacing':'1.8px'});
  }
  ngOnDestroy(): void{
    this._subscription.unsubscribe();
  }
}
