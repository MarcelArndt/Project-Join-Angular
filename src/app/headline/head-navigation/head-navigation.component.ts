import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head-navigation',
  imports: [CommonModule],
  templateUrl: './head-navigation.component.html',
  styleUrl: './head-navigation.component.scss'
})

@HostListener('document:click', ['$event'])

export class HeadNavigationComponent {

  isfirstTime: boolean = true
  currentClass: string = ''


  ngOninit() {
    this.isfirstTime = true;
  }

  toggleNavi() {
    this.isfirstTime = false
    if (!this.currentClass || this.currentClass === 'fade-out') {
      this.currentClass = 'fade-in'
    } else if (this.currentClass === 'fade-in') {
      this.currentClass = 'fade-out'
    }
  }

  closeNavi(event: Event) {
    console.log(event)
    const menu = document.querySelector('.nav-container');
    if (menu && this.currentClass === 'fade-in' && !menu.contains(event.target as Node)) {
      this.currentClass = 'fade-out';
    }
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

}
