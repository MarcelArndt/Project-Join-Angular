import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainFeaturesService {

  constructor() { }

  getNewId(iterations: number = 10, lenght: number = 10): string {
    const date = new Date().getTime().toString();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let numberChainOne = ''
    let numberChainTwo = ''
    let id = ''
    for (let i = 0; i < Math.ceil(lenght / 2); i++) {
      numberChainOne += chars[Math.floor(Math.random() * chars.length)];
      numberChainTwo += chars[Math.floor(Math.random() * chars.length)];
    }
    return numberChainOne + date + numberChainTwo;
  }

}
