import { Injectable, HostListener } from '@angular/core';
import { AllUsers, TaskPayload } from '../interface/interface';
import { AllCategory } from '../interface/interface';
import { Category } from '../interface/interface';
import { AllSubTask } from '../interface/interface';
import { MainFeaturesService } from './main-features.service';
import { DatabaseService } from './database.service';
import { NgForm } from '@angular/forms';
import { AssignedToInputService } from '../content-container/add-task/form-add-task/assigned-to-input/assigned-to-input-service';
import { CategoryInputService } from '../content-container/add-task/form-add-task/category-input/category-input.service';
import { SubtaskInputService } from '../content-container/add-task/form-add-task/subtask-input/subtask-input.service';


@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private main: MainFeaturesService, public database: DatabaseService, private assignService: AssignedToInputService, private  categoryService: CategoryInputService, private subtaskService: SubtaskInputService) { }
  @HostListener('document:click', ['$event'])

  assignedToMenu = document.querySelector('.assignedTo-input');
  categoryMenu = document.querySelector('.category-input');
  addSubTaskMenu = document.querySelector('.subtask-input');
  ProgressIndexForAddTask: number = 0;

  errorText: string = '';
  formHasError: boolean[] = [false, false, false, false]
  formErrorText: string[] = [
    "Your task does not have a valid name with three or more characters.",
    "No due Date is set.",
    'No Category selected.',
    'No person is assigned to your task.'
  ]

  firstTimeVisit: boolean = true;

  allUser?: AllUsers;
  allCategory?: AllCategory;

  allKeys?: string[];
  allCategoryKeys?: string[];
  allSubTaskKey?: string[];

  newTask: TaskPayload = {
    name: '',
    description: '',
    assignedTo: [],
    progress: this.ProgressIndexForAddTask,
    date: '',
    priority: '',
    category: { name: 'No Category', color: '#4F4F4F' } as Category,
    subTasks: {} as AllSubTask,
  }

  pushTaskToDatabase() {
    const id = this.main.getNewId();
    const task = this.newTask;
    this.database.setNewTask(id, task);
  }

  getNewId() {
    return this.main.getNewId()
  }

  allKeyOfCategoryAndAssignedTo() {
    this.allKeys = Object.keys(this.allUser!);
    this.allCategoryKeys = Object.keys(this.allCategory!);
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

  changeIndexOfProgress(index: number) {
    this.ProgressIndexForAddTask = index;
  }

  checkOnMouseHoverValidation(isMouseOnButton:boolean){
    if(isMouseOnButton){
      this.categoryService.onMouseHover()
    } else {
      this.categoryService.onMouseLeave()
    }

  }

  /*

  formErrorText: string[] = [
    "Your task does not have a valid name with three or more characters.",
    "No due Date is set.",
    'No Category selected.',
    'No person is assigned to your task.'
  ]
  */

  checkForValidationinForm(newTaskForm: NgForm, isMouseOnButton: boolean = false): void {
    this.checkOnMouseHoverValidation(isMouseOnButton)
    this.formHasError = [false, false, false, false];
    this.errorText = '';
    this.formHasError[3] = this.assignService.isValid() && !this.assignService.isFirstTimeVisit()? false : true;
    this.formHasError[2] = this.categoryService.isValid()  && !this.categoryService.isFirstTimeVisit()? false : true;
    this.formHasError[1] = this.checkDueDateValidation(newTaskForm, isMouseOnButton);
    this.formHasError[0] = this.checkTaskNameValidation(newTaskForm, isMouseOnButton);
    for (let i = 0; i < this.formHasError.length; i++) {
      if (this.formHasError[i]) {
        this.errorText = this.formErrorText[i];
        break;
      }
    }
  }

  checkDueDateValidation(newTaskForm: NgForm, isMouseOnButton: boolean = false): boolean {
    if ((!this.newTask.date && newTaskForm.form.get('dueDate')?.touched)
      || (!this.newTask.date && isMouseOnButton)) {
      return true;
    }
    return false;
  }

  checkTaskNameValidation(newTaskForm: NgForm, isMouseOnButton: boolean = false): boolean {
    if ((!newTaskForm.form.get('taskTitle')?.valid && newTaskForm.form.get('taskTitle')?.touched)
      || (!newTaskForm.form.get('taskTitle')?.valid && isMouseOnButton)) {
      return true
    }
    return false;
  }

}
