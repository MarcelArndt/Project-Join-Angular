import { Injectable, signal, computed} from '@angular/core';
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
  isFirstTimeVisit = signal<boolean>(true);
  selectetUser=signal<string[]>([]);
  allUsers!:AllUsers;
  allUsersIDKeys!:string[];
  isMouseOnHover = signal(false);
  changeEvent$ = new Subject<void>();

 isValid = computed(() => {
    if (this.isFirstTimeVisit() && !this.isMouseOnHover()) {
      return null;
    }
    return this.selectetUser().length > 0;
  });


  initAssignToDataBase(newTaskDataSet:TaskPayload){
    this.isMenuOpen.set(false);
    this.currentTaskDataSet = newTaskDataSet;
    this.pullAllUsers();
    const value = [...this.currentTaskDataSet.assignedTo]
    this.selectetUser.set(value);
    this.allUsersIDKeys= Object.keys(this.allUsers)
  }
  
  pullAllUsers(){
    this.allUsers = this.database.contacts;
  }

  getListOfAllAssignedUser():string[]{
    return this.selectetUser()
  }

  isUserAleadyAssigned(UserID:string):number{
    const allSelectedUsers = this.selectetUser()
    return allSelectedUsers.indexOf(UserID);
  }

  toggleToAssignTo(UserID:string){
    const currentIndex = this.isUserAleadyAssigned(UserID);
    const allSelectedUsers = [...this.selectetUser()];
    if(currentIndex >= 0){
      allSelectedUsers.splice(currentIndex, 1);
    } else {
      allSelectedUsers.push(UserID);
    }
    this.selectetUser.set(allSelectedUsers); 
    this.changeEvent$.next();
  }

  disableFirstTimeVisit(){
    this.isFirstTimeVisit.set(false)
  }

  enableFirstTimeVisit(){
    this.isFirstTimeVisit.set(true)
  }

  get isfirstTimeVisit():boolean{
    return this.isFirstTimeVisit()
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

  reset(){
    this.isMenuOpen.set(false);
    this.selectetUser.set([]);
    this.isMouseOnHover.set(false);
    this.isFirstTimeVisit.set(true);
  }

  onMouseHover(){
    this.isMouseOnHover.set(true);
  }

  onMouseLeave(){
    this.isMouseOnHover.set(false);
  }

  getData(){
    return this.selectetUser();
  }


}
