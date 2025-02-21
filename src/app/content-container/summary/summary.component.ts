import { Component } from '@angular/core';
import { CardForSummaryComponent } from './card-for-summary/card-for-summary.component';

@Component({
  selector: 'app-summary',
  imports: [CardForSummaryComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
