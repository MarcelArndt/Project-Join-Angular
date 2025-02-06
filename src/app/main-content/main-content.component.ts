import { Component, ViewChild, HostListener } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeadlineComponent } from '../headline/headline.component';

@Component({
  selector: 'app-main-content',
  imports: [NavigationComponent, HeadlineComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  @ViewChild('header') header!: HeadlineComponent;
  @HostListener('document:click', ['$event'])


  ngAfterViewInit() {
    console.log('HeaderComponent:', this.header);
  }

  handleClick(event: Event) {
    this.header.navi.closeNavi(event);
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }
}
