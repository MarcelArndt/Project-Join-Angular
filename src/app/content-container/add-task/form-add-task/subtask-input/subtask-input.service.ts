import { Injectable, signal, } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskPayload, AllSubTask, SubTask  } from '../../../../interface/interface';
import { MainFeaturesService } from '../../../../service/main-features.service';

@Injectable({
  providedIn: 'root'
})
export class SubtaskInputService {

  constructor(private mainService: MainFeaturesService) { }

  isMenuOpen = signal(false);
  resetEvent$ = new Subject<void>();
  allSubTask = signal<AllSubTask | null>(null);
  isFirstTimeVisit = signal<boolean | null>(true);
  taskDataBase!:TaskPayload;
  allKeysOfSubTasks!:string[];
  newSubTask: string = '';

  openMenu(){
    this.isMenuOpen.set(true);
  }

  setNewSubTask(newSubtask:SubTask){
    const allSubTask = this.allSubTask()
    const newID = this.mainService.getNewId()
    if(newSubtask && newID && allSubTask){
      allSubTask[newID] = newSubtask
    }
    this.allSubTask.set(allSubTask);
    this.getAllKeysOfSubTasks();
    this.isFirstTimeVisit.set(false);
    this.newSubTask = '';
  }

  deleteSubTaskByID(id:string){
    const allSubTask = this.allSubTask()
    if(id && allSubTask && allSubTask[id]){
       delete allSubTask[id]
    }
    this.allSubTask.set(allSubTask);
    this.getAllKeysOfSubTasks();
    this.isFirstTimeVisit.set(false);
  }

  closeMenu(){
    this.isMenuOpen.set(false);
    this.isFirstTimeVisit.set(false);
    this.newSubTask = '';
  }

  toggleMenu(){
    this.isMenuOpen.update(currentState => !currentState);
    this.isFirstTimeVisit.set(false);
    if(!this.isMenuOpen()){
      this.newSubTask = '';
    }
  }

  getAllKeysOfSubTasks(){
    const allSubTasks = this.allSubTask();
    if(!allSubTasks) return
    const allKeys = Object.keys(allSubTasks)
    this.allKeysOfSubTasks = allKeys;
  }

  overWriteSubTaskById(id:string, subTask:SubTask){
    const allSubTask =  this.allSubTask();
    if(allSubTask && allSubTask[id]){
      allSubTask[id] = subTask
    }
    this.allSubTask.set(allSubTask);
    this.isFirstTimeVisit.set(false);
  }

  openEditMenuForSubTaskByID(id:string){
    const allSubTasks = this.allSubTask()
    if(allSubTasks && allSubTasks[id]){
      allSubTasks[id].inOnEdit = true;
    }
    this.allSubTask.set(allSubTasks);
    this.getAllKeysOfSubTasks();
    this.isFirstTimeVisit.set(false);
  }

  closeEditMenuForSubTaskByID(id:string){
    const allSubTasks = this.allSubTask()
    if(allSubTasks && allSubTasks[id]){
      allSubTasks[id].inOnEdit = false;
    }
    this.allSubTask.set(allSubTasks);
    this.isFirstTimeVisit.set(false);
  }

  initSubTaskService(taskData:TaskPayload){
    if(!taskData) return;
    this.taskDataBase = structuredClone(taskData);
    this.allSubTask.set(structuredClone(taskData.subTasks));
    this.isMenuOpen.set(false);
    this.isFirstTimeVisit.set(true);
    this.getAllKeysOfSubTasks();
  }

  reset(){
    this.allSubTask.set(this.taskDataBase.subTasks);
    this.isMenuOpen.set(false);
    this.getAllKeysOfSubTasks();
    this.isFirstTimeVisit.set(true);
    this.resetEvent$.next();
  }

  getData(){
    return this.allSubTask()
  }


}
