import { Injectable, Type } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  constructor() { }
  currentComponentSource = new BehaviorSubject<Type<any> | null>(null);
  nextComponent$ = this.currentComponentSource.asObservable();
  isLightBoxOpen: boolean = false;
  firstTimeopen: boolean = true;

  ToggleLightBoxValues() {
    this.firstTimeopen = false;
    this.isLightBoxOpen = !this.isLightBoxOpen;
  }

  openLightBox(component:Type<any>){
    this.firstTimeopen = false;
    this.isLightBoxOpen = true;
    this.currentComponentSource.next(component);
  }

  switchToNextComponent(component:Type<any>){
    this.currentComponentSource.next(component);
  }

  closeLightbox() {
    this.isLightBoxOpen = false;
    this.firstTimeopen = false;
  }

}
