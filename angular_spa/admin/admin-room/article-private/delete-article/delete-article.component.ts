import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/entities/Article';
declare var bootbox:any;

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnChanges{
  @Input() previousArticles: Article[] = [];
  currentArticles: Article[]=[];
  @Output() getRemovedIdEvent = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(){
    this.currentArticles = this.previousArticles;
  }
  removeArticle(id:number){
    const article = this.currentArticles.find(x => x.id === id);
    bootbox.confirm({
      size:"lg",
      title:`Delete Book - ${article?.title.bold().toUpperCase()}`,
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
          this.getRemovedIdEvent.emit(id);
          this.currentArticles = this.currentArticles.filter(x => x.id !== id);
        }
      }
    })
    .find('.modal-content')
    .css({'background': 'radial-gradient(circle,rgba(166,11,14,0.8774860285911239) 0%, rgba(106,22,22,0.89976) 17%)',
        'color':'rgb(255, 255, 232)','font-weight':'800','text-align':'center','letter-spacing':'1.8px'});
  }
}
