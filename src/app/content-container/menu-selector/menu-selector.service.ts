import { Injectable, signal, computed} from '@angular/core';

type ErrorMap = { [key: string]: boolean };

@Injectable({
  providedIn: 'root'
})

export class MenuSelectorService {

  constructor() { }
  isMenuOpen = signal<boolean>(false)
  isTouched = signal<boolean>(false)
  currentValue = signal<string | number | null>(null);
  hasError = signal<Error[] | null>(null)
  isValid = computed(() => {
    return this.checkIsValid()
});


  checkIsValid(){

    if(this.currentValue() === null && !this.isTouched()){
      return true
    }

    const errors: ErrorMap = {};
    const valueError: ErrorMap | null = this.checkForValidValue();

    if (valueError) {
      const key = Object.keys(valueError)[0] as string;
      if (!errors[key]) {
        errors[key] = valueError[key];
      }
    }

    return Object.keys(errors).length === 0;
  }


  checkForValidValue(){
    if (this.isTouched() && this.currentValue() !== null) {
      return null;
    }
    return {hasValue: false};
  }

  toggleMenu(){
    if(this.isMenuOpen()){
      this.isTouched.set(true);
    }
    this.isMenuOpen.update(value => !value)

  }

  openMenu(){
    this.isMenuOpen.set(true);
  }

  closeMenu(){
    this.isMenuOpen.update(value => !value)
    this.isTouched.set(true);
  }

  setValue(value:string | number){
    this.currentValue.set(value);
    this.isTouched.set(true); 
  }

  reset(){
    this.isMenuOpen.set(false);
    this.currentValue.set(null);
    this.hasError.set(null)
    this.isTouched.set(false);
  }

  getValue(){
    return this.currentValue();
  }

}
