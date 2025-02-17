import { Component, Input, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu',
  imports: [CommonModule],
  templateUrl: './burgermenu.component.html',
  styleUrls: ['./burgermenu.component.scss']
})
export class BurgermenuComponent {
  @Input() id: string = ''
  @ViewChild('menuSelfRef') menuSelfRef!: ElementRef;
  isMenuOpen: boolean = false;
  firstTimeOpen: boolean = true;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isMenuOpen && !this.firstTimeOpen && this.menuSelfRef && !this.menuSelfRef.nativeElement.contains(event.target)) {
      this.closeMenu()
    }
  }

  ngOnInit() {
    this.id = this.id ? this.id : this.getNewId();
  }

  ngOnDestroy() {
    this.firstTimeOpen = true;
  }

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
    return 'nav-id-' + numberChainOne + date + numberChainTwo;
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openMenu() {
    this.firstTimeOpen = false;
    this.isMenuOpen = true;
  }

  toggleMenu() {
    this.firstTimeOpen = false;
    this.isMenuOpen = !this.isMenuOpen;
  }
}
