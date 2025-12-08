import { Injectable } from '@angular/core';
import { TaskPayload, Tasks, Contact } from '../interface/interface';
import { AllUsers } from '../interface/interface';
import { AllCategory } from '../interface/interface';
import { SubTask } from '../interface/interface';
import { ApiService } from './api.service';
import { firstValueFrom, tap, switchMap } from 'rxjs';
import { ContactFactoryService } from './contact-factory.service';


export interface TaskResponse {
  tasks: Tasks 
}

export interface ContactsResponse {
  contacts: AllUsers 
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private apiService: ApiService, private contactFactory:ContactFactoryService) { }

  amountForGenerateNewUsers:number = 25;

  currentSelectedTask!:TaskPayload | null;
  currentSelectedTaskID!:string;

  currentSelectedUser!:TaskPayload | null;
  currentSelectedUserID!:string;

  tasksKeys?: string[];
  contactsKeys?: string[];

  tasks: Tasks = {}

  contacts: AllUsers = {};

  ContactsArray!:Contact[]

  async initDatabase(){
    await this.handleTaskAPI();
    await this.handleContactAPI();
    await this.handleContactFactoryAPI();
  }

 async handleContactFactoryAPI(){
    if(Object.keys(this.contacts).length <= 5){
       await this.generateNewUsers(this.amountForGenerateNewUsers)
    }
  }

  async generateNewUsers(amount:number){
    this.contactFactory.initNewContacts(amount)
    this.contactFactory.currentContacts.pipe(

      tap(contacts => {
      this.ContactsArray = [...contacts];
      this.contactsAdapterToJSON();
    }),

    switchMap(() => {
      const body = { contacts: this.contacts };
      return this.apiService.patch(
        this.apiService.ContactEndPoint,
        structuredClone(body)
      );
    })
    )
  
    .subscribe((response)=>{
        console.log(response);
    });
  }

  contactsAdapterToJSON(){
    this.contacts = {}
    this.ContactsArray.forEach(contact => {
      if(!contact.id) return
      this.contacts[contact.id] = {...contact}
    });
  }

  async handleTaskAPI(){
    const respone = await firstValueFrom(this.apiService.get(this.apiService.tasksEndPoint)) as TaskResponse;
   if(respone.tasks === null){
    this.tasks = {}
   } else {
    this.tasks = respone.tasks
   }
  }

    async handleContactAPI(){
    const respone = await firstValueFrom(this.apiService.get(this.apiService.ContactEndPoint)) as ContactsResponse;
   if(respone.contacts === null){
    this.contacts = {}
   } else {
    this.contacts = respone.contacts
   }
  }


  getTasksKeys(): string[] {
    this.tasksKeys = Object.keys(this.tasks);
    return this.tasksKeys || [];
  }

  getAllTasks(){
    return this.tasks;
  }

  getCurrentSelectedTask(){
    return structuredClone(this.currentSelectedTask)
  }

  getAllContacts(){
    return this.contacts;
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

  async saveTaskInAPI(){
    const body = {"tasks" : structuredClone(this.tasks)}
    await firstValueFrom( this.apiService.patch(this.apiService.tasksEndPoint, body));
  }

 async overwriteCurrentSelectedTask(taskID:string, task:TaskPayload){
    this.setCurrentSelectedTaskBlank();
    this.currentSelectedTask = structuredClone(task);
    this.currentSelectedTaskID = taskID;
    await this.saveCurrentSelectedTaskToTask();
  }

  setCurrentSelectedTaskBlank(){
    this.currentSelectedTask = null;
    this.currentSelectedTaskID = '';
  }

  async saveCurrentSelectedTaskToTask(){
    if(!this.tasks[this.currentSelectedTaskID]){
      console.warn(`No task with ID:${this.currentSelectedTaskID} found! No Task saved`);
      return
    }
    if (this.currentSelectedTask) {
      this.tasks[this.currentSelectedTaskID] = structuredClone(this.currentSelectedTask);
    }
    await this.saveTaskInAPI();
  }

  async setNewTask(id:string, task:TaskPayload){
    this.tasks[id] = structuredClone(task);
    await this.saveTaskInAPI();
  }

  async deleteTaskById(id: string) {
    delete this.tasks[id];
    await this.saveTaskInAPI();
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
