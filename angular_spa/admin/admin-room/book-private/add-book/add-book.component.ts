import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Genre } from '../../../../models/enums/Genre';
import { Market } from 'src/app/models/enums/Market';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Book } from 'src/app/models/entities/Book';
import { FileValidator } from 'src/app/admin/admin-validations/file-valid';
import { urlCheck } from '../../../admin-validations/admin-validator';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public viewGenre = Genre;
  public viewMarket = Market;
  formBook!:FormGroup;
  addBook?:Book;
  extension:boolean = false;
  extensionErr:string = "";
  photoName:string="";
  @Output() formEvent = new EventEmitter<FormData>();
  @Output() newBookEvent = new EventEmitter<Book>();

  get nameValid(){
    return this.formBook.get('name')?.invalid &&
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
  get pagesValid(){
    return this.formBook.get('pages')?.invalid &&
          (this.formBook.get('pages')!.touched || this.formBook.get('pages')!.dirty);
  }
  get countryValid(){
    return this.formBook.get('country')!.invalid &&
          (this.formBook.get('country')!.touched || this.formBook.get('country')!.dirty);
  }
  get photoValid(){
    return this.formBook.get('photo')?.invalid &&
            (this.formBook.get('photo')!.touched ||this.formBook.get('photo')!.dirty);
  }
  get linksNameValid(){
    return this.links.get('name')?.invalid &&
          (this.links.get('name')!.touched || this.links.get('name')!.dirty);
  }
  get linksLinkValid(){
    return this.links.get('link')?.invalid &&
          (this.links.get('link')!.touched || this.links.get('link')!.dirty);
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
  get links(): FormArray{
    return this.formBook.get('links') as FormArray;
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialBookForm();
  }
  initialBookForm(){
    this.formBook = this._fb.group({
      market: [Market.Domestic],
      name: ['', Validators.compose([Validators.required,Validators.minLength(3),
                  Validators.maxLength(100)])],
      dateOfPublish: ['',Validators.compose([Validators.required,
                          Validators.min(1999),
                          Validators.max(2050)])],
      publisher: ['', Validators.compose([Validators.required,Validators.maxLength(50)])],
      description: ['',Validators.compose([Validators.required,Validators.minLength(10),
                        Validators.maxLength(50000)])],
      genre1: [Genre.Default, Validators.compose([Validators.required,Validators.min(1)])],
      checkedGenre2: [false],
      genre2: [{value:Genre.Default,disabled:true}],
      checkedGenre3: [false],
      genre3: [{value:Genre.Default,disabled:true}],
      checkedGenre4: [false],
      genre4: [{value:Genre.Default,disabled:true}],
      pages: [0,Validators.compose([Validators.required,Validators.min(20),
                Validators.max(10000)])],
      country: ['',Validators.compose([Validators.required,Validators.minLength(2),
                    Validators.maxLength(4),
                    Validators.pattern('^[a-zA-Z\-\']+')])],
      photo: [null, Validators.compose([Validators.required])],
      links : this._fb.array([
        this._fb.group({
          name: ['',Validators.compose([Validators.required, Validators.minLength(3),
                    Validators.maxLength(200)])],
          link: ['',Validators.compose([Validators.required, Validators.minLength(10),
                    Validators.maxLength(2100),urlCheck()])]
        })
      ])
    },{updateOn:'blur'})
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
  changeMarket(e:any){
    this.market?.setValue(e.target.value,{
      onlySelf: true
    })
  }
  changeGenre1(e:any){
    this.genre1?.setValue(Number(e.target.value), {
      onlySelf: true
    })
  }
  changeGenre2(e:any){
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
    console.log(this.genre4?.value);
  }
  onFileCange(event:Event | null){
    const target = event?.target as HTMLInputElement;
    const file = target.files as FileList;
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

  addHyperLink(){
    this.links.push(this._fb.group({
      name:['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
      link: ['',Validators.compose([Validators.required, Validators.minLength(10),
        Validators.maxLength(2100),urlCheck()])]
    }));
  }
  refreshHyperLink(item:number){
    this.links.at(item).reset();
  }
  removeHyperLink(item:number){
    this.links.removeAt(item);
  }
  onSubmit(value:any){
    delete this.formBook.value.checkedGenre2;
    delete this.formBook.value.checkedGenre3;
    delete this.formBook.value.checkedGenre4;
    delete this.formBook.value.photo;
    this.addBook = value;
    this.addBook!.imageName = this.photoName;
    this.newBookEvent.emit(this.addBook);
    document.location.reload();
    this.formBook.reset();
  }
}
