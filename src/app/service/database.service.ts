import { Injectable } from '@angular/core';
import { TaskPayload, Tasks } from '../interface/interface';
import { AllUsers } from '../interface/interface';
import { AllCategory } from '../interface/interface';
import { SubTask } from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  currentSelectedTask!:TaskPayload | null;
  currentSelectedTaskID!:string;

  currentSelectedUser!:TaskPayload | null;
  currentSelectedUserID!:string;

  tasksKeys?: string[];
  contactsKeys?: string[];
  dummyTask = {
    assignedTo: [
      "id001",
      "id002",
      "id003",
      "id004",
      "id005",
      "id008",
      "id007"
    ],
    category: {
      color: "#2DCD52",
      name: "Testing"
    },
    date: "2025-02-18",
    description: "This is the description of a task. this description has to be long as possible to test some styling things on it.",
    name: "Neues Framework testen",
    priority: "medium",
    progress: 0,
    subTasks: {
      "8OSUI17397016624398QYDV": {
        inOnEdit: false,
        isDone: false,
        text: "remove one Subtask if possible"
      },
      "9K5P41739701621869QD7R3": {
        inOnEdit: false,
        isDone: true,
        text: "check for more Subtasks"
      },
      "69DFJ1739701608748M20V3": {
        inOnEdit: false,
        isDone: false,
        text: "add a new Subtask to your Task"
      }
    }
  };

  tasks: Tasks = { "ZR0C91739701668516SP5TX": this.dummyTask, }

  contacts: AllUsers = {
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

  getTasksKeys(): string[] {
    this.tasksKeys = Object.keys(this.tasks);
    return this.tasksKeys;
  }

  getContactsKeys(): string[] {
    this.contactsKeys = Object.keys(this.contacts);
    return this.contactsKeys;
  }

  setProgressToTask(taskId: string, setProgressNumber: number = 0) {
    if (!taskId) return;
    this.tasks[taskId].progress = setProgressNumber;
  }

  saveSubTasktoTask(taskId: string, subtaskId: string, newSubtaksValues: SubTask) {
    if (!taskId || !subtaskId) return;
    this.tasks[taskId].subTasks![subtaskId] = JSON.parse(JSON.stringify(newSubtaksValues));
  }

  setTaskToCurrentSelectedTask (taskID:string){
    this.setCurrentSelectedTaskBlank();
    if(!this.tasks[taskID]){
      console.warn(`No task with ID:${taskID} found! No Task selected`);
      return
    }
    const selectTask = this.tasks[taskID]
    this.currentSelectedTask = structuredClone(selectTask)
    this.currentSelectedTaskID = taskID;
  }

  overwriteCurrentSelectedTask(taskID:string, task:TaskPayload){
    this.setCurrentSelectedTaskBlank()
    this.currentSelectedTask = structuredClone(task)
    this.currentSelectedTaskID = taskID;
    this.saveCurrentSelectedTaskToTask()
  }

  setCurrentSelectedTaskBlank(){
    this.currentSelectedTask = null;
    this.currentSelectedTaskID = '';
  }

  saveCurrentSelectedTaskToTask(){
    if(!this.tasks[this.currentSelectedTaskID]){
      console.warn(`No task with ID:${this.currentSelectedTaskID} found! No Task saved`);
      return
    }
    if (this.currentSelectedTask) {
      this.tasks[this.currentSelectedTaskID] = structuredClone(this.currentSelectedTask);
    }
  }

  setNewTask(id:string, task:TaskPayload){
    this.tasks[id] = structuredClone(task);
  }

  deleteTaskById(id: string) {
    delete this.tasks[id];
  }

  categories: AllCategory = {
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

}
