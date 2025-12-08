import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map, Subscription, BehaviorSubject } from 'rxjs';

interface Contact {
    firstname: string;
    secondname: string;
    inital: string;
    color: string;
    email: string;
    phone: string;
    id?:string
}

@Injectable({
  providedIn: 'root'
})
export class ContactFactoryService {

  constructor(private https:  HttpClient){}
  currentContacts$ = new BehaviorSubject<Contact[]>([]);
  currentContacts = this.currentContacts$.asObservable();

  initNewContacts(amount:number = 1){
    this.getNewRandomContactAsObservable(amount)
  }

  getNewRandomContactAsObservable(amount:number = 1):Subscription{
    const url = `https://randomuser.me/api/?results=${amount}&nat=de`
    return this.https.get(url).pipe(
        map((response: any) => {
          return response.results.map((dataset: any) => this.generateContact(dataset));
        }),
        catchError(error => {
          console.error('no Connection to URL', error);
          return of(null);
        })
      ).subscribe(contacts => {
        this.currentContacts$.next(contacts);
      });
  }

  generateContact(dataset:any):Contact{
    let newContact: Contact = {} as Contact;
    newContact['firstname'] = dataset.name.first,
    newContact['secondname'] = dataset.name.last,
    newContact['color'] = `hsla(${this.getRandomNumber(255)}, 89%, 59%, 1.00)`
    newContact['inital'] = `${newContact.firstname[0]}${newContact.secondname[0]}`
    newContact['email'] = dataset.email
    newContact['phone'] = dataset.phone
    newContact['id'] = this.getNewId();
    return newContact as Contact;
  }

  getRandomNumber(maxNumber:number=255):number{
    return Math.floor(Math.random() * maxNumber)
  }

  getNewId(lenght: number = 10): string {
    const date = new Date().getTime().toString();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let numberChainOne = ''
    let numberChainTwo = ''
    for (let i = 0; i < Math.ceil(lenght / 2); i++) {
      numberChainOne += chars[Math.floor(Math.random() * chars.length)];
      numberChainTwo += chars[Math.floor(Math.random() * chars.length)];
    }
    return numberChainOne + date + numberChainTwo;
  }


}
