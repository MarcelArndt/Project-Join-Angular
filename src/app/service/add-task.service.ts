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

  ProgressIndexForAddTask: number = 0;

  newTaskForm!:NgForm;

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
      this.assignService.onMouseHover()
    } else {
      this.categoryService.onMouseLeave()
       this.assignService.onMouseLeave()
    }
  }

  checkForErrorInForm(isMouseOnButton:boolean){
    if(!this.newTaskForm) return console.warn('No Form set! Please init the service with initAddTaskService()');

    if(this.assignService.isValid() === false){
      this.formHasError[3] = true
    }
    if(this.categoryService.isValid() === false){
       this.formHasError[2] = true
    }
    if ((!this.newTask.date && this.newTaskForm.form.get('dueDate')?.touched)
      || (!this.newTask.date && isMouseOnButton)) {
        this.formHasError[1] = true;
    }
    if ((!this.newTaskForm.form.get('taskTitle')?.valid && this.newTaskForm.form.get('taskTitle')?.touched)
      || (!this.newTaskForm.form.get('taskTitle')?.valid && isMouseOnButton)) {
      this.formHasError[0] = true;
    }
  }

 initAddTaskService(form:NgForm){
    if(!form) return
    this.newTaskForm = form
  }

  checkForValidationinForm( isMouseOnButton: boolean = false): void {
    this.checkOnMouseHoverValidation(isMouseOnButton)
    this.formHasError = [false, false, false, false];
    this.errorText = '';
    this.checkForErrorInForm(isMouseOnButton);
    for (let i = 0; i < this.formHasError.length; i++) {
      if (this.formHasError[i]) {
        this.errorText = this.formErrorText[i];
        break;
      }
    }
  }

  getNameData(){
    return this.newTaskForm.form.get('taskTitle')?.value
  }

  getDescriptionData(){
    return this.newTaskForm.form.get('description')?.value
  }

  getDueDateData(){
    return this.newTaskForm.form.get('dueDate')?.value
  }

  generateNewTask(task:TaskPayload){
    const newTask = {
    name: task.name,
    description: task.description,
    assignedTo: task.assignedTo,
    progress: task.progress,
    date: task.date,
    priority: task.priority,
    category: task.category? task.category : { name: 'No Category', color: '#4F4F4F' } as Category,
    subTasks: task.subTasks,
  }
  const newId = this.getNewId()
  this.database.setNewTask(newId, structuredClone(newTask));
  }




}
