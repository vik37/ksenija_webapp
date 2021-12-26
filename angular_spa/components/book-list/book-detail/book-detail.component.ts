import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Genre } from 'src/app/models/enums/Genre';
import { Book } from '../../../models/entities/Book';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Hyperlink } from 'src/app/models/entities/Hyperlinks';
import { BookCommentService } from 'src/app/services/book-comment.service';
import { BookLikeService } from 'src/app/services/book-like.service';
import { BookComment } from 'src/app/models/entities/BookComment';
import { NgForm } from '@angular/forms';
import { BookLike } from 'src/app/models/entities/BookLike';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId: number = 0;
  book: Book | undefined;
  genre: Genre | undefined = 0;
  subscription = new Subscription();
  links: Hyperlink[] = [];
  loadLinks: boolean = false;
  btnMsgTranslate: string='book.WhereToBuy';
  arrow:string="right";
  bookImgUrl:string="";
  username:string | null | undefined;
  isAuthenticated!:boolean;
  comments?:BookComment[]=[];
  newComment:string="";
  bookLikes:BookLike[]=[];
  numberOfLikes:number=0;
  like!:boolean;
  likePopup!:string;
  isUserHasLikeClicked!:boolean;
  isAdmin:boolean=false;
  loading:boolean=true;

  constructor(private _bookService: BookService, private _route: ActivatedRoute,
              private _bookCommentService: BookCommentService, private _bookLikeService: BookLikeService,
              private _jwtHelper: JwtHelperService)
              { }
onLoad(): void{
    this.loading = false;
  }
  ngOnInit(): void {
    this.getBookById();
  }
  getBookById(): void{
    const param = this._route.snapshot.paramMap.get('id');
    const id = param?+param:0;
    this.bookId = id;
    this._bookService.getBookById(id)
      .subscribe((data:Book)=>{
        this.book = data;
        this.links = data.links;
        this.loadImage(data.imageName);
        this.isAuthenticated = this.isUserAuthenticated();
      })
  }
  loadImage(imageName:string): void{
    if(imageName != null){
      this.bookImgUrl = this._bookService.PhotoUrl+imageName;
    }
    else{
      this.bookImgUrl = this._bookService.PhotoUrl+"unnamed.png";
    }
  }
  loadHpComponent(): void{
    this.loadLinks = !this.loadLinks;
    if(!this.loadLinks){
      this.arrow="right";
      this.btnMsgTranslate='book.WhereToBuy';
    }
    else{
      this.arrow="left";
      this.btnMsgTranslate='book.hideLinks';
    }
  }
  isUserAuthenticated(): boolean{
    const token: string | null = localStorage.getItem('jwt');
    if(token){
      this.loadBookComment();
      this.loadBookLikes();
      this.isAdmin = this.isUserAdmin(token);
      return true;
    }
    else{
      return false;
    }
  }
  loadBookComment(): void{
    this.comments = this.book?.bookComments;
    this.username =  this._route.snapshot.paramMap.get('username') || "";
  }
  addComment(comment:BookComment,commentForm:NgForm): void{
    this.newComment = comment.bookComment;
    const newComment = {
      bookComment : comment.bookComment,
    } as BookComment;
    this._bookCommentService.postBookComment(this.bookId,this.username || "",newComment)
      .subscribe((res)=>{
        const newBookComment = {
          id:res.id,
          bookComment:res.bookComment,
          user:res.user
        } as BookComment;
        this.comments?.push(newBookComment);
    })
    commentForm.resetForm();
  }
  isUserAdmin(token:string): boolean{
    const dcToken = this._jwtHelper.decodeToken(token);
    const role = dcToken.role;
    if(role==='admin'){
      return true;
    }
    return false;
  }
  removeComment(username:any,id:number){
    this._bookCommentService.removeBookComment(this.bookId,username||"",id).subscribe((res)=>{
      this.comments = this.comments?.filter(x => x.id !== id);
    });
  }
  loadBookLikes(): void{
    this.bookLikes = this.book?.bookLikes || [];
    this.numberOfLikes = this.bookLikes.filter(x => x.like === true).length;
    const likeByUsername = this.bookLikes.filter(x => x.user.username === this.username)
                                          .map(x => x.like) || [];
    if(likeByUsername.length === 0){
      this.like = false;
      this.isUserHasLikeClicked = false;
    }
    else{
      this.like = likeByUsername[0];
      this.isUserHasLikeClicked = true;
    }
    this.likePopup = this.like?'unlike':'like';
  }
  clickLike(): void{
    this.like = !this.like;
    if(this.like){
      this.numberOfLikes++;
      this.likePopup = "unlike";
    }
    else{
      this.numberOfLikes--;
      this.likePopup="like"
    }
    const likeByUnameId = this.bookLikes.filter(x => x.user.username === this.username)
                                          .map(x => x.id) || [];
    const newLike = {
      like : this.like
    } as BookLike
    if(!this.isUserHasLikeClicked){
      this.addNewLike(newLike);
      this.isUserHasLikeClicked = true;
    }
    else{
      this._bookLikeService.putBookLike(this.bookId,this.username||"",likeByUnameId[0]||0,newLike)
                            .subscribe();
    }
  }
  addNewLike(newLike:BookLike){
    this._bookLikeService.postBookLike(this.bookId,this.username||"",newLike).subscribe((res)=>{
      this.bookLikes.push(res);
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}

