import { Component, ViewChild } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { DatabaseService } from '../../service/database.service';
import { BoardTaskCardsComponent } from './board-task-cards/board-task-cards.component';
import { CommonModule } from '@angular/common';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { BoardService } from '../../service/board.service';
import { LightboxComponent } from '../../lightbox/lightbox.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskOverviewComponent } from './task-overview/task-overview.component';


@Component({
  selector: 'app-board',
  imports: [IconComponent, BoardTaskCardsComponent, CommonModule, DropZoneComponent, LightboxComponent, AddTaskComponent, TaskOverviewComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor(public database: DatabaseService, public service: BoardService) { }
  @ViewChild('lightbox') lightbox!: LightboxComponent;

  openAddTaskInLightBox() {
    this.lightbox.openLightBox(AddTaskComponent);
  }

  openTaskOverView(id: string) {
    this.service.setCurrentId(id);
    this.lightbox.openLightBox(TaskOverviewComponent);
  }


}
