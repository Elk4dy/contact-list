import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-list';
  contacts: any = [];

  constructor(private contactsService: ContactsService, private httpClient: HttpClient) {
    // Get contacts from json file
    this.httpClient.get('assets/contacts.json').subscribe((resp) => {
      this.contacts = resp;
    // update globale contacts by Contacts Service
      this.contactsService.changeContacts(this.contacts);
    });
  }
}
