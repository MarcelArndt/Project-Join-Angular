import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavigationService } from '../../service/header-navigation.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-head-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './head-navigation.component.html',
  styleUrl: './head-navigation.component.scss'
})

@HostListener('document:click', ['$event'])

export class HeadNavigationComponent {
  constructor(public naviService: HeaderNavigationService) { }
}
