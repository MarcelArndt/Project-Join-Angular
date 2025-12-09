import { Injectable } from '@angular/core';
import { de, Faker, en, base, de_AT } from '@faker-js/faker';
import { TaskPayload, AllCategory, Category, AllSubTask, SubTask, Tasks, AllUsers } from '../interface/interface';


@Injectable({
  providedIn: 'root'
})

export class TaskFactoryService {
  constructor() { }
  taskFaker = new Faker({locale: [de_AT, de, en, base]});
  users!:AllUsers;

  categories: AllCategory = {
      technicalTask: { name: 'Technical Task', color: '#1DD5BA' },
      userStory: { name: 'User Story', color: '#3F65F0' },
      bug: { name: 'Bug', color: '#CB1942' },
      feature: { name: 'Feature', color: '#FFC803' },
      refactor: { name: 'Refactor', color: '#FE8F10' },
      testing: { name: 'Testing', color: '#2DCD52' },
      documentation: { name: 'Documentation', color: '#7E0DEF' },
      analysisResearch: { name: 'Analysis/Research', color: '#53698E' },
      design: { name: 'Design', color: '#FF61AB' }
    }

  AllTask!:TaskPayload[]

  generateTasks(amount:number= 10){
    const tasksAsJSON:Tasks = {} as Tasks;
    const newArray = Array.from({ length: amount }, () => {
      return this.generateNewTask();
    });

    newArray.forEach((task) => {
      tasksAsJSON[this.getNewId()] = task
    });

    return tasksAsJSON
  }

  injectUsersToTaskFactory(users:AllUsers){
    this.users = users
  }

  generateNewTask():TaskPayload{
    const newTask:TaskPayload = {} as TaskPayload
    newTask['name'] = this.generateFakerTitle();
    newTask['description'] = this.generateFakerDescription();
    newTask['assignedTo'] = this.generateFakeAssignedTo();
    newTask['date'] = this.generateFakeDate();
    newTask['progress'] = this.generateFakeProgresse();
    newTask['priority'] = this.generateFakePrioritye();
    newTask['category'] = this.generateFakeCategorie();
    newTask['subTasks'] = this.generateFakerAllSubTasks();
    return newTask
  }

generateFakerTitle():string {
  const parts = [
    this.taskFaker.hacker.adjective(),
    this.taskFaker.hacker.noun(),
    this.taskFaker.hacker.verb(),
  ];

  const count = this.taskFaker.number.int({ min: 1, max: 3 });
  const selectedParts = parts.slice(0, count);
  selectedParts[0] = selectedParts[0][0].toUpperCase() + selectedParts[0].slice(1);
  return selectedParts.join(" ");
}

generateFakerDescription():string {
  const count = this.taskFaker.number.int({ min: 1, max: 2 });
  return Array.from({ length: count }, () => this.taskFaker.hacker.phrase()).join(" ");
}

generateFakeAssignedTo(){
  if(!this.users) return []
  const users = Object.keys(this.users); // ['#id34','#id12''#id45','#id23','#id67','#id15' ...]
  const count = this.taskFaker.number.int({ min: 3, max: 7 });
  const assignedTo = Array.from({ length: count }, () => {
    return this.taskFaker.helpers.arrayElement(users);
  });
  return assignedTo
}

generateFakeCategorie():Category{
  const allKeys = Object.keys(this.categories)
  return this.categories[this.taskFaker.helpers.arrayElement(allKeys)]
}

generateFakePrioritye():string{
  const allKeys = ['', 'low', 'medium', 'urgent']
  return this.taskFaker.helpers.arrayElement(allKeys)
}

generateFakeProgresse():number{
  return this.taskFaker.number.int({ min: 0, max: 3 })
}

generateFakeDate(): string {
  const date = this.taskFaker.date.soon({days: 360});
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T`;
}

generateFakerAllSubTasks():AllSubTask{
  const count = this.taskFaker.number.int({ min: 0, max: 7 });
  const newAllSubTaskArray = Array.from({length: count}, () => { return this.generateFakerSignleSubTasks()})
  const newAllSubTaskJSON:AllSubTask = {} as AllSubTask
  newAllSubTaskArray.forEach((subtask)=>{
    newAllSubTaskJSON[this.getNewId()] = subtask
  });
  return newAllSubTaskJSON;
}

generateFakerSignleSubTasks():SubTask{
  const newSubTask:SubTask = {} as SubTask;
  newSubTask['text'] = this.taskFaker.hacker.phrase();
  newSubTask['inOnEdit'] = false;
  newSubTask['isDone'] =  this.taskFaker.datatype.boolean();
  return newSubTask
}

  getNewId(lenght: number = 10): string {
    const date = new Date().getTime().toString();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let numberChainOne = ''
    let numberChainTwo = ''
    for (let i = 0; i < Math.ceil(lenght / 2); i++) {
      numberChainOne += chars[Math.floor(Math.random() * chars.length)];
      numberChainTwo += chars[Math.floor(Math.random() * chars.length)];
    }
    return numberChainOne + date + numberChainTwo;
  }


}


