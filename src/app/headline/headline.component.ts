import { Component, ViewChild, viewChild } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { HeadNavigationComponent } from './head-navigation/head-navigation.component';

@Component({
  selector: 'app-headline',
  imports: [IconComponent, HeadNavigationComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  @ViewChild('navi') navi!: HeadNavigationComponent;

  preventClick(event: Event) {
    event.stopPropagation();
  }
}
