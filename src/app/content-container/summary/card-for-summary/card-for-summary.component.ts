import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-for-summary',
  imports: [IconComponent, CommonModule],
  templateUrl: './card-for-summary.component.html',
  styleUrl: './card-for-summary.component.scss'
})
export class CardForSummaryComponent {
  @Input() icon: string = '';
  @Input() value: string = '';
}
