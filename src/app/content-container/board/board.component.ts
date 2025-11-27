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
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LightboxService } from '../../lightbox/lightbox.service';


@Component({
  selector: 'app-board',
  imports: [IconComponent, BoardTaskCardsComponent, CommonModule, DropZoneComponent, LightboxComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor(public database: DatabaseService, public service: BoardService, public lightboxService: LightboxService ) { }
  @ViewChild('lightbox') lightbox!: LightboxComponent;

  openAddTaskInLightBox() {
    this. lightboxService.openLightBox(AddTaskComponent);
  }

  openTaskOverViewInLightBox(id: string) {
    this.service.setCurrentId(id);
    this.database.setTaskToCurrentSelectedTask(id);
    this.lightboxService.openLightBox(TaskOverviewComponent);
  }

  checkLightboxClosingEvent(event:Event){
    console.log(event);
  }

  closeLightBox(){
    this.lightboxService.closeLightbox();
  }

}
