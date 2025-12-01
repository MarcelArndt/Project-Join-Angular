import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityInputService {

  constructor() { }
  currentValue = signal('');

  setValue(value:'' | 'low'| 'medium' | 'urgent'){
   this.currentValue.set(value) 
  }

  reset(){
   this.currentValue.set('')  
  }

  getData(){
   return this.currentValue() as string;
  }

}
