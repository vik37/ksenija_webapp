import { Component, OnInit, Input, OnChanges, OnDestroy,
          Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/entities/Book';
import { Genre } from '../../../../../models/enums/Genre';
import { Market } from 'src/app/models/enums/Market';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/admin/service/book.service';
import { FileValidator } from 'src/app/admin/admin-validations/file-valid';
import { Router } from '@angular/router';



@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit, OnChanges,  OnDestroy {

  @Input() backToChangeBooks!:boolean;
  @Input() book!:Book;
  @Output() backToChangeBookEvent = new EventEmitter<boolean>();
  private _subscription = new Subscription();
  public viewGenre = Genre;
  public viewMarket = Market;
  formBook!:FormGroup;
  currentImgFileUrl?:string;
  formData = new FormData();
  extension:boolean = false;
  extensionErr:string = "";
  photoName:string="";
  disableSaveBtn:boolean=true;
  saveButtonClicked:boolean=true;
  constructor(private _fb: FormBuilder, private _bookService: BookService, private _router: Router) { }

  ngOnInit(): void{

  }
  get nameValid(){
    return this.formBook.get('name')!.invalid &&
          (this.formBook.get('name')!.touched || this.formBook.get('name')!.dirty);
  }
  get descriptionValid(){
    return this.formBook.get('description')?.invalid &&
            (this.formBook.get('description')!.touched || this.formBook.get('description')!.dirty);
  }
  get dateOfPublishValid(){
    return this.formBook.get('dateOfPublish')?.invalid &&
          (this.formBook.get('dateOfPublish')!.touched || this.formBook.get('dateOfPublish')!.dirty);
  }
  get publisherValid(){
    return this.formBook.get('publisher')?.invalid &&
          (this.formBook.get('publisher')!.touched || this.formBook.get('publisher')!.dirty);
  }
  get genre1Valid(){
    return this.formBook.get('genre1')?.invalid &&
          (this.formBook.get('genre1')!.touched || this.formBook.get('genre1')!.dirty);
  }
  get photoValid(){
    return this.formBook.get('imageName')?.invalid &&
            (this.formBook.get('imageName')!.touched ||this.formBook.get('imageName')!.dirty);
  }
  get pagesValid(){
    return this.formBook.get('pages')?.invalid &&
          (this.formBook.get('pages')!.touched || this.formBook.get('pages')!.dirty);
  }
  get countryValid(){
    return this.formBook.get('country')!.invalid &&
          (this.formBook.get('country')!.touched || this.formBook.get('country')!.dirty);
  }

  get market(){
    return this.formBook.get('market');
  }
  get genre1(){
    return this.formBook.get('genre1');
  }
  get genre2(){
    return this.formBook.get('genre2');
  }
  get genre3(){
    return this.formBook.get('genre3');
  }
  get genre4(){
    return this.formBook.get('genre4');
  }
  get checkBox2(){
    return this.formBook.get('checkedGenre2');
  }
  get checkBox3(){
    return this.formBook.get('checkedGenre3');
  }
  get checkBox4(){
    return this.formBook.get('checkedGenre4');
  }
  get imageName(){
    return this.formBook.get('imageName');
  }

  ngOnChanges(changes: SimpleChanges) {
      this.initialBookForm(this.book);
      if(changes.backToChangeBooks.currentValue === false){
        this.currentImgFileUrl = this._bookService.PhotoUrl+this.book!.imageName;
      }
  }
  initialBookForm(val:Book){
    this.formBook = this._fb.group({
      market: [val?.market],
      name: [val?.name,Validators.compose([Validators.minLength(3),
                  Validators.maxLength(100)])],
      dateOfPublish: [val?.dateOfPublish,Validators.compose([Validators.required,
                          Validators.min(1999),
                          Validators.max(2050)])],
      publisher: [val?.publisher, Validators.compose([Validators.required,Validators.maxLength(50)])],
      description: [val?.description,Validators.compose([Validators.required,Validators.minLength(10),
                        Validators.maxLength(50000)])],
      genre1: [val?.genre1, Validators.compose([Validators.required,Validators.min(1)])],
      checkedGenre2: [val?.genre2> 0?true:false],
      genre2: [{value:val?.genre2===0?Genre.Default:val?.genre2,disabled:true}],
      checkedGenre3: [val?.genre3>0?true:false],
      genre3: [{value:val?.genre3===0?Genre.Default:val?.genre3,disabled:true}],
      checkedGenre4: [val?.genre4> 0?true:false],
      genre4: [{value:val?.genre4===0?Genre.Default:val?.genre4,disabled:true}],
      imageName: [null],
      pages: [val?.pages,Validators.compose([Validators.required,Validators.min(20),
                Validators.max(10000)])],
      country: [val?.country,Validators.compose([Validators.required,Validators.minLength(2),
                    Validators.maxLength(4),
                    Validators.pattern('^[a-zA-Z\-\']+')])]
    },{updateOn:'blur'})
  }

  changeMarket(e:any){
    this.market!.setValue(e.target.value,{
      onlySelf: true
    })
  }
  changeGenre1(e:any){
    this.genre1?.setValue(Number(e.target.value), {
      onlySelf: true
    })
  }
  changeGenre2(e:any){
    console.log(e.target.value);
    this.genre2?.setValue(Number(e.target.value), {
      onlySelf: true
    })
  }
  changeGenre3(e:any){
    this.genre3?.setValue(Number(e.target.value), {
      onlySelf: true
    })
  }
  changeGenre4(e:any){
    this.genre4?.setValue(Number(e.target.value), {
      onlySelf: true
    })
  }
  checkedGenre2Enable(){
    this.checkBox2?.setValue(!this.checkBox2.value);
    !this.formBook.value.checkedGenre2?this.formBook.get('genre2')?.disable():this.formBook.get('genre2')?.enable();
    this.genre2?.setValue(0);
  }
  checkedGenre3Enable(){
    this.checkBox3?.setValue(!this.checkBox3?.value);
    !this.formBook.value.checkedGenre3?this.formBook.get('genre3')?.disable():this.formBook.get('genre3')?.enable();
    this.genre3?.setValue(0);
  }
  checkedGenre4Enable(){
    this.checkBox4?.setValue(!this.checkBox4?.value);
    !this.formBook.value.checkedGenre4?this.formBook.get('genre4')?.disable():this.formBook.get('genre4')?.enable();
    this.genre4?.setValue(0);
  }
  onFileCange(event:Event){
    if(this.imageName?.touched){
      this.saveButtonClicked = false;
    }
    const reader = new FileReader();
    const target = event!.target as HTMLInputElement;
    const files = target.files as FileList;
    if(files.length > 0){
      reader.readAsDataURL(files[0]);
      reader.onload = ()=>{
        this.currentImgFileUrl = reader.result as string;
      }
      this.extension = FileValidator.checkExtension(files[0].type);
      if(!this.extension){
        this.extensionErr = "Must be jpg, jpeg or png file";
        this.disableSaveBtn = true;
      }
      else{
        this.photoName = files[0].name;
        this.formData.append("uploadFile",files[0],files[0].name);
        this.disableSaveBtn = false;
      }
    }
    else{
      this.disableSaveBtn = true;
    }
  }
  saveImage(){
    if(!this.disableSaveBtn || this.photoName !== null){
      this._bookService.uploadBookPhoto(this.formData).subscribe();
      this.disableSaveBtn = false;
      this.saveButtonClicked = true;
    }
    else{
      this.disableSaveBtn = true;
    }
  }
  onSubmit(){
    const updatedBook = {
      id: this.book.id,
      name: this.formBook.value.name,
      publisher: this.formBook.value.publisher,
      dateOfPublish: this.formBook.value.dateOfPublish,
      description: this.formBook.value.description,
      genre1: this.formBook.value.genre1,
      genre2: this.formBook.value.genre2?this.formBook.value.genre2:0,
      genre3: this.formBook.value.genre3?this.formBook.value.genre3:0,
      genre4: this.formBook.value.genre4?this.formBook.value.genre4:0,
      pages: this.formBook.value.pages,
      market: this.formBook.value.market,
      country: this.formBook.value.country,
      imageName: this.photoName === ""?this.book.imageName:this.photoName,
      links: this.book.links
    } as Book;
    this._bookService.updateBook(this.book.id,updatedBook).subscribe(()=>{
      document.location.reload();
    },(error:any)=>{
      this._router.navigate(['/not-found']);
    });
  }
  backToChangeBook(){
    this.backToChangeBooks = true;
    this.backToChangeBookEvent.emit(this.backToChangeBooks);
    this.disableSaveBtn = true;
    this.saveButtonClicked = true;
  }
  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
