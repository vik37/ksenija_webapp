import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { ArticlePrivateComponent } from './admin-room/article-private/article-private.component';
import { BookPrivateComponent } from './admin-room/book-private/book-private.component';
import { ContactPrivateComponent } from './admin-room/contact-private/contact-private.component';
import { AllUsersComponent } from './admin-room/all-users/all-users.component';


const routes: Routes = [
  {path:'',component:AdminRoomComponent, children:[
    {
      path:'private-press', component:ArticlePrivateComponent
    },
    {
      path:'private-book', component:BookPrivateComponent
    },
    {
      path:'private-contact', component:ContactPrivateComponent
    },
    {
      path:'private-all-users', component:AllUsersComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
