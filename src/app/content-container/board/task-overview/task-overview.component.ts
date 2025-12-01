import { Component} from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { BoardService } from '../../../service/board.service';
import { TaskPayload } from '../../../interface/interface';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AllUsers } from '../../../interface/interface';
import { LightboxService } from '../../../lightbox/lightbox.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-overview',
  imports: [IconComponent, CommonModule],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})

export class TaskOverviewComponent {
  constructor(public service: BoardService, private database: DatabaseService , private lightboxService:LightboxService) { }

  task?: TaskPayload;
  contacts?: AllUsers;
  AllSubtaskKeys?: string[];

  ngOnInit() {
    this.task = this.database.tasks[this.service.currentId];
    this.contacts = this.database.contacts;
    this.AllSubtaskKeys = Object.keys(this.task!.subTasks || {});
  }

  getDateInFormat() {
    const year = this.task?.date.slice(0, 4);
    const month = this.task?.date.slice(5, 7);
    const day = this.task?.date.slice(8, 10);
    return `${day}/${month}/${year}`;
  }

  toggleSubtaskIsDone(subtaskId: string) {
    this.task!.subTasks![subtaskId].isDone = !this.task!.subTasks![subtaskId].isDone;
    this.database.saveSubTasktoTask(this.service.currentId, subtaskId, this.task!.subTasks![subtaskId]);
  }

  deleteTask(taskId: string) {
    delete this.database.tasks[taskId];
    this.lightboxService.closeLightbox();
  }

  swicthLightBoxToEdit(){
    this.lightboxService.switchToNextComponent(EditTaskComponent);
  }

}
