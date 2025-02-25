import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-summary',
  imports: [IconComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  currentTimeText:string =''
  summaryValues = {
    numberOfToDo:1,
    numberOfDone:2,
    numberOfUrgentTasks:3,
    numberOfTaskInBoard:4,
    numberOfTaskInProgress:5,
    numberOfAwaitFeedback:6,
  }

  ngOnInit(){
    this. currentTimeText = this.getTime();
  }

  getTime(){
    const currentHour = new Date().getHours();
    const hoursOfADay = 24;
    const AmountToDevideInPercent = 25;
    const timeText = ['Good Night', 'Good Morning', 'Good Afternoon', 'Good Evening', 'Midnight']
    const currentValue = Math.floor(Math.floor(currentHour / hoursOfADay * 100) / AmountToDevideInPercent);
    return timeText[currentValue];
  }

}
