import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }
  currentDragElement?: HTMLElement;
  isOnDrag: boolean = false;
  currentId: string = '';

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

  setCurrentId(id: string) {
    this.currentId = id;
  }

  clearCurrentId() {
    this.currentId = '';
  }

}
