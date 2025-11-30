import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AddTaskService } from '../../../service/add-task.service';
import { AssignedToInputComponent } from './assigned-to-input/assigned-to-input.component';
import { CategoryInputComponent } from './category-input/category-input.component';
import { PriorityInputComponent } from './priority-input/priority-input.component';
import { SubtaskInputComponent } from './subtask-input/subtask-input.component';
import { MainFeaturesService } from '../../../service/main-features.service';
import { AllSubTask } from '../../../interface/interface';
import { DatabaseService } from '../../../service/database.service';
import { AssignedToInputService } from './assigned-to-input/assigned-to-input-service';
import { CategoryInputService } from './category-input/category-input.service';
import { PriorityInputService } from './priority-input/priority-input.service';
import { SubtaskInputService } from './subtask-input/subtask-input.service';


@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule, AssignedToInputComponent, CategoryInputComponent, PriorityInputComponent, SubtaskInputComponent],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './drop-down-menu.scss']
})
export class FormAddTaskComponent {
  constructor(
    public service: AddTaskService,
    private main: MainFeaturesService,
    public database: DatabaseService,
    private assignService: AssignedToInputService,
    private categoryService:CategoryInputService,
    private priorityService:PriorityInputService,
    private subtaskService :SubtaskInputService ,
  ) { }
  dateToday?: string;
  checkCategory: boolean = false;
  checkAssignedTo: boolean = false;
  @ViewChild('addTaskForm') addTaskForm!: NgForm;

  ngOnInit() {
    this.service.allKeyOfCategoryAndAssignedTo();
    this.dateToday = this.main.getCurrentDate();
  }

  ngAfterViewInit(){
  
  }

  resetForm(form: NgForm) {
    form.reset();
    this.priorityService.reset();
    this.categoryService.reset();
    this.assignService.reset();
    this.subtaskService.reset();
    this.service.newTask.name = '';
    this.service.newTask.assignedTo = [];
    this.service.allSubTaskKey = [];
    this.service.checkForValidationinForm(form, false);
  }

  checkForValidationForButton(form: NgForm) {
    this.checkCategory = !this.categoryService.getCurrentChoice() ? false : true;
    this.checkAssignedTo = this.assignService.selectetUser().length <= 0 ? false : true;
    if (form.valid && this.checkCategory && this.checkAssignedTo) {
      return true;
    }
    return false;
  }

  creatNewTask(form: NgForm) {
    this.service.pushTaskToDatabase();
    this.resetForm(form);
    console.log(this.database.tasks);
  }

  onPriorityChange(priority: '' | 'low'| 'medium' | 'urgent') {
    this.service.newTask.priority = priority
  }
}
