import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ArticleService } from './service/article.service';
import { BookService } from './service/book.service';
import { UserService } from 'src/app/admin/service/user.service';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminRoomComponent } from './admin-room/admin-room.component';
import { ArticlePrivateComponent } from './admin-room/article-private/article-private.component';
import { BookPrivateComponent } from './admin-room/book-private/book-private.component';
import { AddBookComponent } from './admin-room/book-private/add-book/add-book.component';
import { ChangeBookComponent } from './admin-room/book-private/change-book/change-book.component';
import { ContactPrivateComponent } from './admin-room/contact-private/contact-private.component';
import { AddArticleComponent } from './admin-room/article-private/add-article/add-article.component';
import { DeleteArticleComponent } from './admin-room/article-private/delete-article/delete-article.component';

import { TranformEnumPipe } from './pipe/tranform-enum.pipe';
import { UpdateBookComponent } from './admin-room/book-private/change-book/update-book/update-book.component';
import { ChangeLinksComponent } from './admin-room/book-private/change-book/change-links/change-links.component';
import { AllUsersComponent } from './admin-room/all-users/all-users.component';


@NgModule({
  declarations: [
    AdminRoomComponent,
    ArticlePrivateComponent,
    BookPrivateComponent,
    AddBookComponent,
    ChangeBookComponent,
    ContactPrivateComponent,
    AddArticleComponent,
    DeleteArticleComponent,
    TranformEnumPipe,
    UpdateBookComponent,
    ChangeLinksComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ArticleService,
    BookService,
    UserService
  ]
})
export class AdminModule { }
