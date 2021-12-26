import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Article } from 'src/app/models/entities/Article';
import { ArticleService } from '../../service/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-private',
  templateUrl: './article-private.component.html',
  styleUrls: ['./article-private.component.css']
})
export class ArticlePrivateComponent implements OnInit, OnDestroy{

  addOrChange: boolean = true;
  private _subscription = new Subscription();
  @Output() articles: Article[] = [];
  @Output() postedArticle?: Article;
  formData = new FormData();
  @Output() photoUrl:string = "";
  titlePage: string="Delete Press";

  constructor(private _service: ArticleService) { }

  ngOnInit(): void {
    this.refreshArticles();
    this.photoUrl = this._service.PhotoUrl;
  }

  changeToDelete(){
    this.addOrChange=true;
    this.titlePage = "Delete Press";
  }
  changeToAdd(){
    this.addOrChange = false;
    this.titlePage = "Add Press";
  }
  removeArticle(value:number){
    this._service.removeArticle(value).subscribe(()=>{
      this.refreshArticles();
    });
  }
  addArticle(article:Article){
    this._service.addArticle(article).subscribe((data)=>{
      this.postedArticle = data as Article;
    });
    this._service.uploadArticlePhoto(this.formData).subscribe();
  }
  getFormData(formData:FormData){
    this.formData = formData;
  }
  refreshArticles(){
    this._service.getArticles().subscribe((data)=>{
      this.articles = data;
    });
  }
  ngOnDestroy(): void{
    this._subscription.unsubscribe();
  }
}
