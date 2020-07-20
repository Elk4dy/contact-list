import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = new BehaviorSubject([]);
  currentContacts = this.contacts.asObservable();

  constructor() { }

  changeContacts(updatedContacts: any) {
    this.contacts.next(updatedContacts)
  }
}
