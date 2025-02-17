import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { DatabaseService } from '../../service/database.service';
import { BoardTaskCardsComponent } from './board-task-cards/board-task-cards.component';
import { CommonModule } from '@angular/common';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { BoardService } from '../../service/board.service';
import { LightboxComponent } from '../../lightbox/lightbox.component';
import { AddTaskComponent } from '../add-task/add-task.component';


@Component({
  selector: 'app-board',
  imports: [IconComponent, BoardTaskCardsComponent, CommonModule, DropZoneComponent, LightboxComponent, AddTaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor(public database: DatabaseService, public service: BoardService) { }
}
