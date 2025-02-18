import { Component, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'lightbox',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  @ViewChild('lightboxContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  isLightBoxOpen: boolean = false;
  firstTimeopen: boolean = true;

  openLightBox<T>(component: Type<T>) {
    this.firstTimeopen = false;
    this.isLightBoxOpen = true;
    this.contentContainer.clear();
    this.contentContainer.createComponent(component);
  }

  closeLightbox() {
    this.isLightBoxOpen = false;
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

}
