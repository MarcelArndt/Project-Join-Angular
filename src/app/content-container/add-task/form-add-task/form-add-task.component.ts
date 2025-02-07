import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AllUsers } from '../../../interface/interface';

@Component({
  selector: 'app-form-add-task',
  imports: [FormsModule, IconComponent, CommonModule],
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss', './../../../../form.scss', './../../../../checkbox.scss', './assign-to.scss']
})
export class FormAddTaskComponent {
  firstTimeVisit: boolean = true;
  allUser: AllUsers = {
    id001: { firstname: 'Max', secondname: 'Mustermann', inital: 'MM', color: '#ff5733', email: 'max.mustermann@example.com', phone: '+49 170 1234567' },
    id002: { firstname: 'Erika', secondname: 'Muster', inital: 'EM', color: '#33ff57', email: 'erika.muster@example.com', phone: '+49 151 9876543' },
    id003: { firstname: 'John', secondname: 'Doe', inital: 'JD', color: '#5733ff', email: 'john.doe@example.com', phone: '+49 160 4567890' },
    id004: { firstname: 'Jane', secondname: 'Doe', inital: 'JD', color: '#f1c40f', email: 'jane.doe@example.com', phone: '+49 152 3456789' },
    id005: { firstname: 'Lara', secondname: 'Croft', inital: 'LC', color: '#e74c3c', email: 'lara.croft@example.com', phone: '+49 163 1122334' },
    id006: { firstname: 'Bruce', secondname: 'Wayne', inital: 'BW', color: '#34495e', email: 'bruce.wayne@example.com', phone: '+49 159 2233445' },
    id007: { firstname: 'Tony', secondname: 'Stark', inital: 'TS', color: '#d35400', email: 'tony.stark@example.com', phone: '+49 157 3344556' },
    id008: { firstname: 'Clark', secondname: 'Kent', inital: 'CK', color: '#2980b9', email: 'clark.kent@example.com', phone: '+49 176 4455667' },
    id009: { firstname: 'Peter', secondname: 'Parker', inital: 'PP', color: '#8e44ad', email: 'peter.parker@example.com', phone: '+49 175 5566778' },
  };

  allKeys?: string[];

  assignToObj = {
    open: false,
    selectetUser: [] as string[],
    allUser: this.allUser,
  }

  ngOnInit() {
    this.allKeys = Object.keys(this.allUser);
  }

  toggleAssignedToWindow() {
    this.firstTimeVisit = false;
    this.assignToObj.open = !this.assignToObj.open
  }

  toggleAssignTo(id: string = 'id001') {
    let isAssinedTo = this.isAssinedTo(id);
    let position = 0
    if (!isAssinedTo) {
      this.assignToObj.selectetUser.push(id);
    } else if (isAssinedTo) {
      position = this.assignToObj.selectetUser.indexOf(id)
      this.assignToObj.selectetUser.splice(position, 1);
    }
  }

  isAssinedTo(id: string = 'id001') {
    return this.assignToObj.selectetUser.includes(id);
  }


  preventClick(event: Event) {
    event.stopPropagation();
  }

}
