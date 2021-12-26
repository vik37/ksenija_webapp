import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Observable, Subscription, timer, interval } from 'rxjs';
import { Article } from 'src/app/models/entities/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  articles: Article[] = [];
  articlePhotoUrl:string = "";
  isAuthenticated!:boolean;
  loading:boolean=true;
  counterLoading = interval(5000);
  constructor(private _articleService: ArticleService ) { }
  onLoad(): void{
    this.loading = false;
  }
  ngOnInit(): void {
    this.refreshArticleList();
    this.articlePhotoUrl = this._articleService.PhotoUrl;
    this.counterLoading.subscribe(()=>{
      this.loading = false;
    })
  }
  refreshArticleList(){
    this._articleService.getArticles().subscribe(data =>{
      this.articles = data;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
