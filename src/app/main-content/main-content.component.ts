import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeadlineComponent } from '../headline/headline.component';
import { HeaderNavigationService } from '../headline/head-navigation/header-navigation.service';
import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'app-main-content',
  imports: [NavigationComponent, HeadlineComponent, ContentContainerComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  constructor(public headerNaviService: HeaderNavigationService) { }
}
