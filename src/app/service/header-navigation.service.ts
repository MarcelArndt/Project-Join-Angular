import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderNavigationService {

  constructor(public router: Router) { }
  @HostListener('document:click', ['$event'])
  isfirstTime: boolean = true
  isfadingIn: boolean = false
  naviMenu = document.querySelector('.nav-container');

  toggleNavi() {
    this.isfirstTime = false
    if (!this.isfirstTime) {
      this.isfadingIn = !this.isfadingIn;
    }
  }

  closeNavi(event: Event) {
    if (!this.isfirstTime && !this.naviMenu?.contains(event.target as Node)) {
      this.isfadingIn = false;
    }
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

  userLogOut() {
    this.isfirstTime = true
    this.isfadingIn = false
    this.router.navigate(["/login"])
  }

}
