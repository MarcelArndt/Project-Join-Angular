import { Component, Input } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { TaskPayload } from '../../../interface/interface';
import { SubTask } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../icon/icon.component';


@Component({
  selector: 'app-board-task-cards',
  imports: [CommonModule, IconComponent],
  templateUrl: './board-task-cards.component.html',
  styleUrl: './board-task-cards.component.scss'
})
export class BoardTaskCardsComponent {
  constructor(public database: DatabaseService) { }
  @Input() taskId: string = '';
  @Input() orderNumber: number = 0;
  task?: TaskPayload;
  allSubTaskKeys?: string[];
  AmountOfSubtaskAreDone: number = 0;
  lengthOfTaskBar: string = '0px'


  ngOnInit() {
    this.task = this.database.tasks[this.taskId];
    this.allSubTaskKeys = Object.keys(this.task.subTasks);
    this.checkForSubTaskKeysAreDone();
  }

  checkForSubTaskKeysAreDone() {
    this.allSubTaskKeys?.forEach((idOfSubtask: string) => {
      this.AmountOfSubtaskAreDone = this.task?.subTasks[idOfSubtask].isDone ? this.AmountOfSubtaskAreDone += 1 : this.AmountOfSubtaskAreDone;
    });
    this.lengthOfTaskBar = Math.floor(100 / this.allSubTaskKeys!.length * this.AmountOfSubtaskAreDone).toString() + '%'
  }



}
