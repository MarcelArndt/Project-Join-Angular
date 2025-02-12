import { Injectable, HostListener } from '@angular/core';
import { AllUsers, SubTask, TaskPayload } from '../interface/interface';
import { AllCategory } from '../interface/interface';
import { Category } from '../interface/interface';
import { AllSubTask } from '../interface/interface';
import { Task } from '../interface/interface';
import { MainFeaturesService } from './main-features.service';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private main: MainFeaturesService) { }
  @HostListener('document:click', ['$event'])

  assignedToMenu = document.querySelector('.assignedTo-input');
  categoryMenu = document.querySelector('.category-input');
  addSubTaskMenu = document.querySelector('.subtask-input');

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

  allCategory: AllCategory = {
    technicalTask: { name: 'Technical Task', color: '#1DD5BA' },
    userStory: { name: 'User Story', color: '#3F65F0' },
    bug: { name: 'Bug', color: '#CB1942' },
    feature: { name: 'Feature', color: '#FFC803' },
    refactor: { name: 'Refactor', color: '#FE8F10' },
    testing: { name: 'Testing', color: '#2DCD52' },
    documentation: { name: 'Documentation', color: '#7E0DEF' },
    nocategory: { name: 'No Category', color: '#4F4F4F' },
    analysisResearch: { name: 'Analysis/Research', color: '#53698E' },
    design: { name: 'Design', color: '#FF61AB' }
  }

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
    date: '',
    priority: '',
    category: { name: 'No Category', color: '#4F4F4F' } as Category,
    subTask: {} as SubTask,
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
    this.allKeys = Object.keys(this.allUser);
    this.allCategoryKeys = Object.keys(this.allCategory);
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }


}
