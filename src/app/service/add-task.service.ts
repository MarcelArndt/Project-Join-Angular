import { Injectable, HostListener } from '@angular/core';
import { AllUsers } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor() { }
  @HostListener('document:click', ['$event'])

  assignedToMenu = document.querySelector('.select-input');

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
  search: string = '';

  assignToObj = {
    open: false,
    selectetUser: [] as string[],
    allUser: this.allUser,
  }

  newTask = {
    name: '',
    description: '',
    assignedTo: [],
    date: '',
    priority: '',
  }

  closeAssignedTo(event: Event) {
    if (!this.firstTimeVisit && !this.assignedToMenu?.contains(event.target as Node)) {
      this.assignToObj.open = false;
      this.search = '';
    }
  }

}
