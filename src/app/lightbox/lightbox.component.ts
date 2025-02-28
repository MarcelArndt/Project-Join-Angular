import { Component, Type, ViewChild, ComponentRef, ViewContainerRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LightboxService } from './lightbox.service';

@Component({
  selector: 'lightbox',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  constructor(public service: LightboxService ){
    this.service.nextComponent$.subscribe( (comp) => {
      if(comp){
        this.loadComponent(comp);
      } else {
        this.clearComponent();
      }
    });
  }

  @ViewChild('lightboxContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  currentComponentRef: ComponentRef<any> | null = null;
 
  openLightBox<T>(component: Type<T>) {
    this.contentContainer.clear();
    this.contentContainer.createComponent(component);
    this.service.ToggleLightBoxValues();
  }

  switchContent<T>(component: Type<T>){
    this.contentContainer.clear();
    this.contentContainer.createComponent(component);
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

  closeLightbox(){
    this.service.closeLightbox()
  }

  ngOnDestroy(){
    this.service.firstTimeopen = true;
    this.service.isLightBoxOpen = false;
  }

  loadComponent(component:Type<any>){
    if(!this.contentContainer) return;
    this.contentContainer.clear();
    this.currentComponentRef = this.contentContainer.createComponent(component);
  }

  clearComponent(){
    if(!this.currentComponentRef) return;
    this.currentComponentRef?.destroy()
  }

}
