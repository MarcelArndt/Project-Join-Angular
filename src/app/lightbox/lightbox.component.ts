import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'lightbox',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  isLightBoxOpen: boolean = false;
  firstTimeopen: boolean = true;


  toggleLightbox() {
    this.firstTimeopen = false;
    this.isLightBoxOpen = !this.isLightBoxOpen;
  }

  openLightBox() {
    this.firstTimeopen = false;
    this.isLightBoxOpen = true;
  }

  closeLightbox() {
    this.isLightBoxOpen = false;
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

}
