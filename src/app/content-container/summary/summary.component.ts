import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-summary',
  imports: [IconComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  constructor(private database: DatabaseService){}

  month = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }

  ngOnInit(){

  }

   get currentTime(){
    const currentHour = new Date().getHours();
    const hoursOfADay = 24;
    const AmountToDevideInPercent = 25;
    const timeText = ['Good Night', 'Good Morning', 'Good Afternoon', 'Good Evening', 'Midnight']
    const currentValue = Math.floor(Math.floor(currentHour / hoursOfADay * 100) / AmountToDevideInPercent);
    return timeText[currentValue];
  }

  get amountOfTask(){
    return Object.keys(this.database.tasks).length || 0
  }

  get awaitFeedbackTask(){
    const results = Object.values(this.database.tasks).filter(task => task.progress === 2).length;
    return results || 0
  }

  get inProgressTask(){
    const results = Object.values(this.database.tasks).filter(task => task.progress === 1).length;
    return results || 0
  }

  get stringOfDate(){
    const newestTime = this.urgentTime
    if(!newestTime) return 'no date found'
    const array = newestTime.date.split("-");
    const currentMonth = array[1]as keyof typeof this.month
    const dateObj = {
      day : array[2],
      month: this.month[currentMonth],
      year : array[0],
    }
    return `${dateObj.month} ${dateObj.day}, ${dateObj.year}`
  }

  get isUpcomingTaskNextUrgentTime(){
    const currentTimestamp = Date.now();
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
    const taskTimestamp = this.urgentTime.timestamp
    const isPast = taskTimestamp < currentTimestamp;
    const isWithinNext5Days = taskTimestamp >= currentTimestamp && taskTimestamp <= currentTimestamp + fiveDaysInMs;
    return isPast || isWithinNext5Days;
  }

  get isUrgentTaskUpcoming(){
    return this.urgentTime ? true : false
  }

  get urgentTime(){
      const tasksArray = Object.values(this.database.tasks);
      const sorted = tasksArray.map(task => ({ ...task, timestamp: new Date(task.date).getTime() })).sort((taskA, taskB) => taskA.timestamp - taskB.timestamp);
      const sortedTaskByIsDone  = sorted.filter(task => task.progress < 3);
      return sortedTaskByIsDone[0]
  }

  get DoneTask(){
    const results = Object.values(this.database.tasks).filter(task => task.progress === 3).length;
    return results || 0
  }

  get toDoTask(){
    const results = Object.values(this.database.tasks).filter(task => task.progress === 0).length;
    return results || 0
  }

  get priorityTask(){
    const results = Object.values(this.database.tasks).filter(task => task.priority === 'urgent').length;
    return results || 0
  }

}
