import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }
  currentDragElement?: HTMLElement;
  isOnDrag = false;

  setCurrentDragElement(element: HTMLElement) {
    this.currentDragElement = element;
  }

  resetCurrentDragElement() {
    this.currentDragElement = undefined;
  }

  setisOnDragOn() {
    this.isOnDrag = true;
  }

  setisOnDragOff() {
    this.isOnDrag = false;
  }

}
