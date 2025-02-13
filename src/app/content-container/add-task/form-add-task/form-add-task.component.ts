import { Component } from '@angular/core';
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

@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule, AssignedToInputComponent, CategoryInputComponent, PriorityInputComponent, SubtaskInputComponent],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './drop-down-menu.scss']
})
export class FormAddTaskComponent {
  constructor(public service: AddTaskService, private main: MainFeaturesService) { }
  dateToday?: string;
  errorText: string = '';
  checkCategory: boolean = false;
  checkAssignedTo: boolean = false;
  formHasError: boolean[] = [false, false, false, false]
  formErrorText: string[] = [
    "Your task doesn't have a name.",
    "No due Date is set.",
    'No Category selected.',
    'No person is assigned to your task.'
  ]

  ngOnInit() {
    this.service.allKeyOfCategoryAndAssignedTo();
    this.dateToday = this.main.getCurrentDate();
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
      margin += 1;
    }
    return `${margin}px`
  }

  resetForm(form: NgForm) {
    form.reset();
    this.service.newTask.priority = '';
    this.service.search = '';
    this.service.newTask.assignedTo = [];
    this.service.assignToObj.selectetUser = []
    this.service.newTask.category = { name: 'No Category', color: '#4F4F4F' };
    this.service.categoryObj.currentName = 'Select Task Category';
    this.service.addSubTaskObj.allSubTasks = {} as AllSubTask;
    this.service.allSubTaskKey = [];
  }

  checkForValidation(form: NgForm) {
    this.checkCategory = this.service.newTask.category.name == 'No Category' ? false : true;
    this.checkAssignedTo = this.service.assignToObj.selectetUser.length <= 0 ? false : true;
    if (form.valid && this.checkCategory && this.checkAssignedTo) {
      return false;
    }
    return true;
  }

  setError(newTaskForm: NgForm) {
    if (this.service.newTask.name.length < 3 && newTaskForm.form.get('taskTitle')?.touched) this.errorText = "Your task doesn't have a name."
    if (!this.service.newTask.date && newTaskForm.form.get('dueDate')?.touched) this.errorText = "No due Date is set."
    if (this.service.categoryObj.currentName == 'Select Task Category' && !this.service.categoryObj.firstTimeVisit) this.errorText = 'No Category selected.'
    if (!this.service.assignToObj.firstTimeVisit && this.service.assignToObj.selectetUser.length <= 0) this.errorText = 'No person is assigned to your task.'
    this.errorText = '';
  }

  checkForValidationinForm(newTaskForm: NgForm, isMouseOnButton: boolean = false): void {
    // Zurücksetzen aller Fehler
    this.formHasError = [false, false, false, false];
    this.errorText = '';

    if ((!this.service.assignToObj.firstTimeVisit && this.service.assignToObj.selectetUser.length <= 0)
      || (this.service.assignToObj.selectetUser.length <= 0 && isMouseOnButton)) {
      this.formHasError[3] = true;
    }

    if ((this.service.categoryObj.currentName == 'Select Task Category' && !this.service.categoryObj.firstTimeVisit)
      || (this.service.categoryObj.currentName == 'Select Task Category' && isMouseOnButton)) {
      this.formHasError[2] = true;
    }

    if ((!this.service.newTask.date && newTaskForm.form.get('dueDate')?.touched)
      || (!this.service.newTask.date && isMouseOnButton)) {
      this.formHasError[1] = true;
    }

    if ((this.service.newTask.name.length < 3 && newTaskForm.form.get('taskTitle')?.touched)
      || (this.service.newTask.name.length < 3 && isMouseOnButton)) {
      this.formHasError[0] = true;
    }

    // Setzt die Fehlermeldung, falls Fehler vorliegen
    for (let i = 0; i < this.formHasError.length; i++) {
      if (this.formHasError[i]) {
        this.errorText = this.formErrorText[i];
        break; // Erste Fehlernachricht setzen und Schleife beenden
      }
    }
  }

}
