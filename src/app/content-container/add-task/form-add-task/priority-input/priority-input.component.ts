import { Component } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-input',
  imports: [CommonModule, IconComponent],
  templateUrl: './priority-input.component.html',
  styleUrl: './priority-input.component.scss'
})
export class PriorityInputComponent {
  constructor(public service: AddTaskService) { }

  setPriority(value: string = '') {
    if (this.service.newTask.priority === value) {
      this.service.newTask.priority = ''
      return
    } else if (this.service.newTask.priority != value) {
      this.service.newTask.priority = value;
      return
    }
  }
}
