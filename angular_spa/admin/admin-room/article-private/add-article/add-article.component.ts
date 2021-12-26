import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Article } from 'src/app/models/entities/Article';
import { FileValidator } from 'src/app/admin/admin-validations/file-valid';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  article?:Article;
  photoName:string="";
  photoEmpty:boolean = false;
  extensionErr:string="";
  extension:boolean=false;
  @Output() postArticleEvent = new EventEmitter<any>();
  @Output() formEvent = new EventEmitter<FormData>();
  @Input() postedArticle?:Article;
  @Input() photoUrl:string = "";

  constructor() { }

  checkPhotoName(){
    if(this.photoName === null){
      this.photoEmpty = false;
    }
    else{
      this.photoEmpty = true;
    }
  }
  onArticleSubmit(article:Article){
    this.article = article;
    this.article.photoName = this.photoName;
    this.postArticleEvent.emit(this.article);
    this.checkPhotoName();
  }
  onFileCange(event:Event){
    const target = event.target as HTMLInputElement;
    var file = target.files as FileList;
    this.extension = FileValidator.checkExtension(file[0].type);
    if(!this.extension){
      this.extensionErr = "Must be jpg, jpeg or png file";
    }
    else{
      const formData: FormData = new FormData();
      this.photoName = file[0].name;
      formData.append("uploadFile",file[0],file[0].name);
      this.formEvent.emit(formData);
    }
  }
}
