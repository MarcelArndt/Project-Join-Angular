import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { TaskPayload } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../icon/icon.component';
import { BurgermenuComponent } from '../../../burgermenu/burgermenu.component';
import { BoardService } from '../../../service/board.service';

@Component({
  selector: 'app-board-task-cards',
  imports: [CommonModule, IconComponent, BurgermenuComponent],
  templateUrl: './board-task-cards.component.html',
  styleUrl: './board-task-cards.component.scss'
})
export class BoardTaskCardsComponent {
  constructor(public database: DatabaseService, public service: BoardService) { }
  @Input() taskId: string = '';
  @Input() oderNumberInColoumn: number = 0;
  @ViewChild('card') card!: ElementRef;
  task?: TaskPayload;
  allSubTaskKeys?: string[];
  AmountOfSubtaskAreDone: number = 0;
  lengthOfTaskBar: string = '0px'

  ngAfterViewInit() {
    this.card.nativeElement.id = this.taskId;
  }

  ngOnInit() {
    this.task = this.database.tasks[this.taskId];
    this.allSubTaskKeys = Object.keys(this.task.subTasks);
    this.checkForAmountOfSubtaskAreDone();
    this.checkForLenghtOfSubtaskBar();
  }

  checkForAmountOfSubtaskAreDone() {
    this.AmountOfSubtaskAreDone = 0;
    this.task = this.database.tasks[this.taskId];
    this.allSubTaskKeys = Object.keys(this.task.subTasks)
    this.allSubTaskKeys?.forEach((idOfSubtask: string) => {
      this.AmountOfSubtaskAreDone = this.task?.subTasks[idOfSubtask].isDone ? this.AmountOfSubtaskAreDone += 1 : this.AmountOfSubtaskAreDone;
    });
    return this.AmountOfSubtaskAreDone;
  }

  checkForLenghtOfSubtaskBar() {
    this.lengthOfTaskBar = Math.floor(100 / this.allSubTaskKeys!.length * this.AmountOfSubtaskAreDone).toString() + '%'
    return this.lengthOfTaskBar;
  }


  preventClick(event: Event) {
    event.stopPropagation();
  }

  startToDrag(event: DragEvent) {
    this.card.nativeElement.id = this.taskId;
    this.service.setCurrentDragElement(this.card.nativeElement);
    this.service.setisOnDragOn();
  }

  stopToDrag() {
    this.service.resetCurrentDragElement();
    this.service.setisOnDragOff();
  }


}
