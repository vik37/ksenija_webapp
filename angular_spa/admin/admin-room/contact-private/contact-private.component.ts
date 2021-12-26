import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/admin/service/contact.service';
import { Contact } from 'src/app/models/entities/Contact';

@Component({
  selector: 'app-contact-private',
  templateUrl: './contact-private.component.html',
  styleUrls: ['./contact-private.component.css']
})
export class ContactPrivateComponent implements OnInit, OnDestroy {

  private _subscription:Subscription = new Subscription();
  contacts:Contact[] = [];
  totalNumberOfContacts:number = 0;
  constructor(private _contactService: ContactService) { }

  ngOnInit(): void {
    this.refreshContact();
  }
  refreshContact(): void{
    this._contactService.getAllContacts().subscribe((data)=>{
      this.contacts = data;
      this.totalNumberOfContacts = data.length;
    });
  }
  removeContact(id: number): void{
    this.contacts = this.contacts.filter(x => x.id !== id);
    this.totalNumberOfContacts--;
    this._contactService.removeContact(id).subscribe();
  }
  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
