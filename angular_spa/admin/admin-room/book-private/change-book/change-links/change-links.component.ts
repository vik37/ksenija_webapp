import { Component,Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Hyperlink } from 'src/app/models/entities/Hyperlinks';
import { HyperLinksService } from 'src/app/admin/service/hyper-links.service';
declare var bootbox:any;

@Component({
  selector: 'app-change-links',
  templateUrl: './change-links.component.html',
  styleUrls: ['./change-links.component.css']
})
export class ChangeLinksComponent implements  OnChanges {
  @Input() hyperLinks:Hyperlink[] = [];
  currentHpLinks:Hyperlink[] = [];
  @Input() backToChangeBooks!:boolean;
  @Output() sendBackToChangeBook = new EventEmitter<boolean>();
  newHyperLink!:Hyperlink;
  @Input() bookId!:number;

  constructor(private _hpLinkService: HyperLinksService) { }

  ngOnChanges(changes: SimpleChanges){
    if(!changes.backToChangeBooks.currentValue){
      this.currentHpLinks = this.hyperLinks;
    }
  }
  removeArticle(linkId:number){
      const link = this.currentHpLinks.find(x => x.id === linkId);
      bootbox.confirm({
        size:"lg",
        title:`Delete Book - ${link?.name.bold().toUpperCase()}`,
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
            this.currentHpLinks = this.currentHpLinks.filter(x => x.id !== linkId);
            this._hpLinkService.deleteLink(this.bookId,linkId).subscribe();
          }
        }
      })
      .find('.modal-content')
      .css({'background': 'radial-gradient(circle,rgba(166,11,14,0.8774860285911239) 0%, rgba(106,22,22,0.89976) 17%)',
          'color':'rgb(255, 255, 232)','font-weight':'800','text-align':'center','letter-spacing':'1.8px'});
  }
  onSubmit(hyperLink:Hyperlink){
    this.newHyperLink = hyperLink;
    this.currentHpLinks.push(this.newHyperLink);
    this._hpLinkService.postLink(this.newHyperLink,this.bookId).subscribe();
  }
  backToChangeBook(){
    this.backToChangeBooks = true;
    this.sendBackToChangeBook.emit(this.backToChangeBooks);
    if(this.hyperLinks.length !== this.currentHpLinks.length ||
           this.newHyperLink !== undefined){
      window.location.reload();
    }
  }
}
