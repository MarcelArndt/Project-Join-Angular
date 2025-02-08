import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AddTaskService } from '../../../service/add-task.service';

@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './assign-to.scss']
})
export class FormAddTaskComponent {
  constructor(public service: AddTaskService) { }
  dateToday?: string;

  ngOnInit() {
    this.service.allKeys = Object.keys(this.service.allUser);
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
    this.service.firstTimeVisit = true;
    this.service.assignToObj.open = false
    this.service.search = '';
  }

  toggleAssignedToWindow() {
    this.service.firstTimeVisit = false;
    this.service.assignToObj.open = !this.service.assignToObj.open
    this.service.search = '';
  }

  searchForName(personKey: string): boolean {
    let firstname = this.service.allUser[personKey].firstname.toLowerCase();
    let secondname = this.service.allUser[personKey].secondname.toLowerCase();
    let inital = this.service.allUser[personKey].inital.toLowerCase();
    let search = this.service.search.toLowerCase();
    if (search.length < 3) return true;
    if (firstname.includes(search)) return true;
    if (secondname.includes(search)) return true;
    if (inital.includes(search)) return true;
    return false;
  }

  toggleAssignTo(id: string = 'id001') {
    let isAssinedTo = this.isAssinedTo(id);
    let position = 0
    if (!isAssinedTo) {
      this.service.assignToObj.selectetUser.push(id);
    } else if (isAssinedTo) {
      position = this.service.assignToObj.selectetUser.indexOf(id)
      this.service.assignToObj.selectetUser.splice(position, 1);
    }
  }

  isAssinedTo(id: string = 'id001') {
    return this.service.assignToObj.selectetUser.includes(id);
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }

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
