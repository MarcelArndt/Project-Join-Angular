import { Injectable } from '@angular/core';
import { TaskPayload, Tasks, TaskWithId } from '../../../interface/interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  dataBase!: TaskWithId[];
  results$ = new BehaviorSubject<TaskWithId[] | null>(null);
  results = this.results$.asObservable();
  isOnSearch:boolean=false;

  initSearch(dataSet:Tasks){
    this.dataBase = Object.entries(dataSet).map(([id, task]) => ({id,task}));
  }

  search(text:string){
    this.results$.next(this.startSearching(text));
  }

  startSearching(text:string):TaskWithId[] | null{
    if(!this.dataBase || !text) return null
    const searchKey = text.toLowerCase();
    let inName = null
    let inDescription = null
    let inSubtasks = null
    return this.dataBase.filter(taskArray => {
      inName = taskArray.task.name.toLowerCase().includes(searchKey);
      inDescription = taskArray.task.description.toLowerCase().includes(searchKey);
      inSubtasks = taskArray.task.subTasks ? Object.values(taskArray.task.subTasks).some(sub =>
      sub.text.toLowerCase().includes(text)) : null;
      return inName || inDescription || inSubtasks;
    });
  }





}
