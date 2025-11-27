import { Component } from '@angular/core';
import { FormAddTaskComponent } from './form-add-task/form-add-task.component';
import { DatabaseService } from '../../service/database.service';
import { AddTaskService } from '../../service/add-task.service';
@Component({
  selector: 'app-add-task',
  imports: [FormAddTaskComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  constructor(public database: DatabaseService, public service: AddTaskService) { }
  ngOnInit() {
    this.service.allUser = this.database.contacts;
    this.service.allCategory = this.database.categories;
  }
}
