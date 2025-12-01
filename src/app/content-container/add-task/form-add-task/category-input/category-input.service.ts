import { Injectable,signal, computed,} from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryInputService {

  constructor() { }
  isFirstTimeVisit = signal<boolean>(true);
  isMenuOpen = signal(false);
  changeEvent$ = new Subject<void>();
  currentChoice = signal<Category | null>(null);
  isMouseOnHover = signal(false);

isValid = computed(() => {
    if (this.isFirstTimeVisit() && !this.isMouseOnHover()) {
      return null;
    }
    return this.currentChoice() !== null;
  });


  openMenu(){
    this.isMenuOpen.set(true);
  }

  closeMenu(){
    this.isMenuOpen.set(false);
    this.changeEvent$.next();
    this.isFirstTimeVisit.set(false);
  }

  toggleMenu(){
    this.isMenuOpen.update(currentState => !currentState);
    this.changeEvent$.next();
    this.isFirstTimeVisit.set(false);
  }

  setCurrentChoice(choice:Category | null){
    this.currentChoice.set(choice);
    if (choice !== null) {
      this.closeMenu();
    }
    this.changeEvent$.next();
  }

  getCurrentChoice(): Category | null {
    return this.currentChoice();
  }

  getCurrentChoiceName(): string {
    const choice = this.currentChoice();
    return choice?.name || '';
  }

  onMouseHover(){
    this.isMouseOnHover.set(true);
  }

  onMouseLeave(){
    this.isMouseOnHover.set(false);
  }

  reset(){
    this.isMenuOpen.set(false);
    this.currentChoice.set(null);
    this.isMouseOnHover.set(false);
    this.isFirstTimeVisit.set(true);
    this.changeEvent$.next();
  }

  getData(){
   return this.currentChoice();
  }

}
