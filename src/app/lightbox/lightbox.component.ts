import { Component, Type, ViewChild, ComponentRef, ViewContainerRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LightboxService } from './lightbox.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lightbox',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {

  @ViewChild('lightboxContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  currentComponentRef: ComponentRef<any> | null = null;
  componentSubcribtion?: Subscription;

  constructor(public service: LightboxService ){
    this.componentSubcribtion = this.service.nextComponent$.subscribe( (comp) => {
      if(comp){
        this.loadComponent(comp);
      } else {
        this.clearComponent();
      }
    });
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(){
    this.service.firstTimeopen = true;
    this.service.isLightBoxOpen = false;
    this.componentSubcribtion?.unsubscribe();
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
