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



@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule, AssignedToInputComponent, CategoryInputComponent, PriorityInputComponent, SubtaskInputComponent],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './drop-down-menu.scss']
})
export class FormAddTaskComponent {
  constructor(public service: AddTaskService, private main: MainFeaturesService, public database: DatabaseService, private assignService: AssignedToInputService ) { }
  dateToday?: string;
  checkCategory: boolean = false;
  checkAssignedTo: boolean = false;
  @ViewChild('addTaskForm') addTaskForm!: NgForm;

  ngOnInit() {
    this.service.allKeyOfCategoryAndAssignedTo();
    this.dateToday = this.main.getCurrentDate();
  }

  ngAfterViewInit(){
    this.assignService.changeEvent$.subscribe(() => {
      this.service.checkForValidationinForm(this.addTaskForm!, false);
    });
  }

  ngOnDestroy() {
    this.service.assignToObj.firstTimeVisit = true;
    this.service.categoryObj.firstTimeVisit = true;
    this.service.assignToObj.open = false
    this.service.categoryObj.open = false
    this.service.search = '';
  }

  get buttonMarginTop(): string {
    const allSubtasks = Object.keys(this.service.addSubTaskObj.allSubTasks);
    if (allSubtasks.length >= 3) return `${62 * 3}px`
    let margin = 0;
    for (let i = 0; i < allSubtasks.length; i++) {
      margin += 62;
    }
    return `${margin}px`
  }

  resetForm(form: NgForm) {
    form.reset();
    this.service.newTask.name = '';
    this.service.newTask.priority = '';
    this.service.search = '';
    this.service.newTask.assignedTo = [];
    this.service.assignToObj.selectetUser = []
    this.service.newTask.category = { name: 'No Category', color: '#4F4F4F' };
    this.service.categoryObj.currentName = 'Select Task Category';
    this.service.addSubTaskObj.allSubTasks = {} as AllSubTask;
    this.service.allSubTaskKey = [];
    this.service.categoryObj.firstTimeVisit = true;
    this.service.assignToObj.firstTimeVisit = true;
    this.service.addSubTaskObj.firstTimeVisit = true;
    this.service.checkForValidationinForm(form, false);
  }

  checkForValidationForButton(form: NgForm) {
    this.checkCategory = this.service.newTask.category.name == 'No Category' ? false : true;
    this.checkAssignedTo = this.service.assignToObj.selectetUser.length <= 0 ? false : true;
    if (form.valid && this.checkCategory && this.checkAssignedTo) {
      return true;
    }
    return false;
  }

  creatNewTask(form: NgForm) {
    this.service.newTask.assignedTo = this.service.assignToObj.selectetUser;
    this.service.newTask.subTasks = this.service.addSubTaskObj.allSubTasks;
    this.service.pushTaskToDatabase();
    this.resetForm(form);
    console.log(this.database.tasks);
  }

  onPriorityChange(priority: '' | 'low'| 'medium' | 'urgent') {
    this.service.newTask.priority = priority
  }
}
