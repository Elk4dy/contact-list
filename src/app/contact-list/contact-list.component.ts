import { Component, OnInit, Input } from '@angular/core';
import * as recentContactsData from '../recent-contact.json';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  // Get recent contacts from json file
  recentContacts:  any = (recentContactsData as any).default;
  contacts: any = [];
  
  constructor(private contactsService: ContactsService) {
    
   }

  ngOnInit(): void {
    // Get contacts List from global service
    this.contactsService.currentContacts.subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

}
