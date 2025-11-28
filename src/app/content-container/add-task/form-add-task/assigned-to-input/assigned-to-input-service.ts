import { ElementRef, Injectable, signal, ViewChild } from '@angular/core';
import { AllUsers, TaskPayload,} from '../../../../interface/interface';
import { DatabaseService } from '../../../../service/database.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignedToInputService{

  constructor(private database: DatabaseService ) { }
  isMenuOpen = signal(false);
  currentTaskDataSet!:TaskPayload;

  firstTimeVisit:boolean=true;
  selectetUser:string[] = [];
  allUsers!:AllUsers;
  allUsersIDKeys!:string[];

  changeEvent$ = new Subject<void>();


  initAssignToDataBase(newTaskDataSet:TaskPayload){
    this.isMenuOpen.set(false);
    this.initCurrentTaskDataSet(newTaskDataSet);
    this.pullAllUsers();
    this.selectetUser = [...this.currentTaskDataSet.assignedTo];
    this.allUsersIDKeys= Object.keys(this.allUsers)
  }

  initCurrentTaskDataSet(newTaskDataSet:TaskPayload){
    this.currentTaskDataSet = newTaskDataSet;
  }
  
  pullAllUsers(){
    this.allUsers = this.database.contacts;
  }

  getListOfAllAssignedUser():string[]{
    return this.selectetUser
  }


  checkAssignToValidation(isMouseOnButton: boolean = false) {
    if ((!this.firstTimeVisit && this.selectetUser.length <= 0)
      || (this.selectetUser.length <= 0 && isMouseOnButton)) {
      return true;
    }
    return false;
  }

  isUserAleadyAssigned(UserID:string):number{
    return this.selectetUser.indexOf(UserID);
  }

  toggleToAssignTo(UserID:string){
    const currentIndex = this.isUserAleadyAssigned(UserID)
    if(currentIndex >= 0){
      this.selectetUser.splice(currentIndex, 1);
    } else if (currentIndex < 0) {
      this.selectetUser.push(UserID)
    }
    this.changeEvent$.next();
  }

  disableFirstTimeVisit(){
    this.firstTimeVisit = false;
  }

  enableFirstTimeVisit(){
    this.firstTimeVisit = true; 
  }

  get isfirstTimeVisit():boolean{
    return this.firstTimeVisit
  }

  openMenu(){
    this.isMenuOpen.set(true);
  }

  closeMenu(){
    this.isMenuOpen.set(false);
    this.changeEvent$.next();
  }

  toggleMenu(){
    this.isMenuOpen.update(currentStatus => !currentStatus);
    if(!this.isMenuOpen()){
      this.changeEvent$.next();
    }
  }


}
