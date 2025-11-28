import { Injectable,signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryInputService {

  constructor() { }

  isMenuOpen = signal(false);
  changeEvent$ = new Subject<void>();

  openMenu(){
    this.isMenuOpen.set(true);
  }

  closeMenu(){
    this.isMenuOpen.set(false);
    this.changeEvent$.next();
  }

  toggleMenu(){
    this.isMenuOpen.update(currentState => !currentState);
    this.changeEvent$.next();
  }


}
