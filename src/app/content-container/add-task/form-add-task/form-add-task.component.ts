import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AddTaskService } from '../../../service/add-task.service';
import { Category } from '../../../interface/interface';
import { AssignedToInputComponent } from './assigned-to-input/assigned-to-input.component';
import { CategoryInputComponent } from './category-input/category-input.component';
import { PriorityInputComponent } from './priority-input/priority-input.component';
import { SubtaskInputComponent } from './subtask-input/subtask-input.component';

@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule, AssignedToInputComponent, CategoryInputComponent, PriorityInputComponent, SubtaskInputComponent],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './drop-down-menu.scss']
})
export class FormAddTaskComponent {
  constructor(public service: AddTaskService) { }
  dateToday?: string;

  ngOnInit() {
    this.service.allKeyOfCategoryAndAssignedTo();
    this.dateToday = this.getCurrentDate();
  }

  getCurrentDate() {
    const today = new Date();
    const day = this.getTimeValueOf_asString(today.getDate());
    const month = this.getTimeValueOf_asString(today.getMonth() + 1);
    const year = today.getFullYear();
    const date = `${year}-${month}-${day}`
    return date
  }

  getTimeValueOf_asString(value: number) {
    const string = value.toString();
    const newValue = string.length < 2 ? `0${string}` : string;
    return newValue;
  }

  ngOnDestroy() {
    this.service.assignToObj.firstTimeVisit = true;
    this.service.categoryObj.firstTimeVisit = true;
    this.service.assignToObj.open = false
    this.service.categoryObj.open = false
    this.service.search = '';
  }

}
