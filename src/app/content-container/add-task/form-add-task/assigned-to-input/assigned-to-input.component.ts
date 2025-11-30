import { Component, ViewChild, ElementRef, Input, effect, Output, EventEmitter, HostListener } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPayload, User } from '../../../../interface/interface';
import { AssignedToInputService } from './assigned-to-input-service';

@Component({
  selector: 'app-assigned-to-input',
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './assigned-to-input.component.html',
  styleUrls: ['./assigned-to-input.component.scss', './../drop-down-menu.scss']
})
export class AssignedToInputComponent {
  constructor(public service: AddTaskService, public assignService: AssignedToInputService) {}

    @HostListener('document:click', ['$event'])
  
      onDocumentClick(event: MouseEvent) {
      if(!this.assignService.isFirstTimeVisit() && this.assignService.isMenuOpen()){
        this.assignService.closeMenu();
      }
    }
  
  @Output() selectedUser = new EventEmitter<string[]>();
  @Input({required:true})CurrentTaskDataSet!:TaskPayload;
  @Input() OnHoverIsValid: boolean = false;
  @ViewChild('serachbar') serachbar!: ElementRef<HTMLInputElement>;




  searchResults: string[] = [];
  searchHasResults: boolean = false;
  currentSearchKey:string = '';
  @Input() form?: NgForm;

  ngOnInit() {
    this.assignService.initAssignToDataBase(this.CurrentTaskDataSet);
    this.searchForResults();
  }


  toggleAssignedToWindow() {
    this.assignService.disableFirstTimeVisit();
    this.assignService.toggleMenu();
  }

  preventClick(event:Event){
    event.stopPropagation();
  }


  searchForResults() {
    const search = this.resetLastSearch()
    let resultCounter = 0;
    for (let i = 0; i < this.assignService.allUsersIDKeys!.length; i++) {
      if (search.length == 0) {
        this.searchResults.push(this.assignService.allUsersIDKeys![i]);
        resultCounter += 1;
        this.searchHasResults = true;
      } else {
        const person = this.PreparePersonForSearch(this.assignService.allUsersIDKeys![i]);
        const result = this.search(person, this.assignService.allUsersIDKeys![i], search);
        resultCounter = result ? resultCounter + 1 : resultCounter;
      }
    }
    this.searchHasResults = resultCounter > 0 ? true : false;
  }

  resetLastSearch() {
    this.searchResults = [];
    this.searchHasResults = false;
    return this.currentSearchKey.toLowerCase();
  }

  PreparePersonForSearch(personKey: string = '') {
    let obj = { firstname: '', secondname: '', inital: '' };
    obj.firstname = this.assignService.allUsers![personKey].firstname.toLowerCase();
    obj.secondname = this.assignService.allUsers![personKey].secondname.toLowerCase();
    obj.inital = this.assignService.allUsers![personKey].inital.toLowerCase();
    return obj;
  }

  getCurrentValue(){
    this.assignService.selectetUser();
  }

  search(person: User, personId: string = '', search: string = '') {
    const keys = Object.keys(person) as Array<keyof User>;
    for (let i = 0; i < keys.length; i++) {
      if (person[keys[i]].includes(search)) {
        this.searchResults.push(personId);
        return true;
      }
    }
    return false;
  }

}


