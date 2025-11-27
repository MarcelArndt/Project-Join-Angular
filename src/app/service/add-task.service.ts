import { Injectable, HostListener } from '@angular/core';
import { AllUsers, SubTask, TaskPayload } from '../interface/interface';
import { AllCategory } from '../interface/interface';
import { Category } from '../interface/interface';
import { AllSubTask } from '../interface/interface';
import { MainFeaturesService } from './main-features.service';
import { DatabaseService } from './database.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private main: MainFeaturesService, public database: DatabaseService) { }
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
  search: string = '';

  assignToObj = {
    open: false,
    selectetUser: [] as string[],
    allUser: this.allUser,
    firstTimeVisit: true,
  }

  addSubTaskObj = {
    open: false,
    firstTimeVisit: true,
    currentTask: '',
    allSubTasks: {} as AllSubTask,
  }

  categoryObj = {
    open: false,
    allCategory: this.allCategory,
    currentName: 'Select Task Category',
    currentKey: '',
    firstTimeVisit: true,
  }

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

  checkforClosingWindow(event: Event) {
    this.closeAssignedTo(event);
    this.closeCategory(event);
  }

  closeAssignedTo(event: Event) {
    if (!this.assignToObj.firstTimeVisit && this.assignToObj.open && !this.assignedToMenu?.contains(event.target as Node)) {
      this.assignToObj.open = false;
      this.search = '';
    }
  }

  closeAddSubTask(event: Event) {
    if (!this.assignToObj.firstTimeVisit && this.assignToObj.open && !this.assignedToMenu?.contains(event.target as Node)) {
      this.assignToObj.open = false;
      this.addSubTaskObj.currentTask = '';
    }
  }

  closeCategory(event: Event) {
    if (!this.categoryObj.firstTimeVisit && this.categoryObj.open && !this.categoryMenu?.contains(event.target as Node)) {
      this.categoryObj.open = false;
      this.search = '';
    }
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

  checkForValidationinForm(newTaskForm: NgForm, isMouseOnButton: boolean = false): void {
    this.formHasError = [false, false, false, false];
    this.errorText = '';
    this.formHasError[3] = this.checkAssignToValidation(isMouseOnButton);
    this.formHasError[2] = this.checkCategoryValidation(isMouseOnButton);
    this.formHasError[1] = this.checkDueDateValidation(newTaskForm, isMouseOnButton);
    this.formHasError[0] = this.checkTaskNameValidation(newTaskForm, isMouseOnButton);
    for (let i = 0; i < this.formHasError.length; i++) {
      if (this.formHasError[i]) {
        this.errorText = this.formErrorText[i];
        break;
      }
    }
  }

  checkCategoryValidation(isMouseOnButton: boolean = false): boolean {
    if ((this.categoryObj.currentName == 'Select Task Category' && !this.categoryObj.firstTimeVisit)
      || (this.categoryObj.currentName == 'Select Task Category' && isMouseOnButton)) {
      return true;
    }
    return false;
  }

  checkAssignToValidation(isMouseOnButton: boolean = false): boolean {
    if ((!this.assignToObj.firstTimeVisit && this.assignToObj.selectetUser.length <= 0)
      || (this.assignToObj.selectetUser.length <= 0 && isMouseOnButton)) {
      return true;
    }
    return false;
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
