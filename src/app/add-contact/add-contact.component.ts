import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as contactsData from '../contacts.json';
import * as countriesCode from '../country-codes.json';
import { Contact } from './contact.model';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  // Reading Contacts from json file 
  contacts: any = (contactsData as any).default;
  // Reading Countries code from json file 
  countryCodes: any = (countriesCode as any).default;
  // Cntact Model
  contact: any = new Contact;
  // The image preview URL
  imageUrl: string;
  // Conatc Form values and validation
  contactsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
    countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.contactsForm.controls;
  }

  onFileChange(event) {
    // Upload image functionality
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Uploaded image Preview
        this.imageUrl = reader.result as string;

      };
    }
  }

  submit(formValues) {
    // Submit contact info
    this.contact.name = formValues.value.name;
    this.contact.lastName = formValues.value.lastName;
    this.contact.image = formValues.value.file;
    this.contact.mobileNumber = formValues.value.countryCode.toString() + formValues.value.mobileNumber.toString();
    this.contact.email = formValues.value.email;
    
    // Push contact to the contacts list
    this.contacts.push(this.contact);

    // Add the updates array of contacts to the global contacts
    this.contactsService.changeContacts(this.contacts);

    // Navigate to the Contacts page
    this.router.navigateByUrl('');
  }

  goTOContctsPage() {
    // Navigate to the Contacts page
    this.router.navigateByUrl('');
  }

}
