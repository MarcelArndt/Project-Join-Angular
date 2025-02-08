import { Component, ViewChild, viewChild } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { HeadNavigationComponent } from './head-navigation/head-navigation.component';
import { HeaderNavigationService } from '../service/header-navigation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-headline',
  imports: [IconComponent, HeadNavigationComponent, RouterModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  constructor(public naviService: HeaderNavigationService) {

  }


}
