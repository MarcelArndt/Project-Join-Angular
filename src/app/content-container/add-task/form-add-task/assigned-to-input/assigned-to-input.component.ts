import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Person } from '../../../../interface/interface';

@Component({
  selector: 'app-assigned-to-input',
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './assigned-to-input.component.html',
  styleUrls: ['./assigned-to-input.component.scss', './../drop-down-menu.scss']
})
export class AssignedToInputComponent {
  constructor(public service: AddTaskService) { }
  @Input() OnHoverIsValid: boolean = false;
  @ViewChild('serachbar') serachbar!: ElementRef<HTMLInputElement>;
  searchResults: string[] = [];
  searchHasResults: boolean = false;
  @Input() form?: NgForm;

  ngOnInit() {
    this.service.allKeyOfCategoryAndAssignedTo();
    this.searchFotResults();
  }

  toggleAssignedToWindow() {
    this.service.assignToObj.firstTimeVisit = false;
    this.service.assignToObj.open = !this.service.assignToObj.open;
    this.service.search = '';
    this.service.checkForValidationinForm(this.form!, false);
    if (this.service.assignToObj.open) {
      setTimeout(() => { this.serachbar.nativeElement.focus() }, 250)
    }
  }

  toggleAssignTo(id: string = '') {
    let isAssinedTo = this.isAssinedTo(id);
    let position = 0
    if (!isAssinedTo) {
      this.service.assignToObj.selectetUser.push(id);
    } else if (isAssinedTo) {
      position = this.service.assignToObj.selectetUser.indexOf(id)
      this.service.assignToObj.selectetUser.splice(position, 1);
    }
    this.service.checkForValidationinForm(this.form!, false);
  }

  isAssinedTo(id: string = '') {
    return this.service.assignToObj.selectetUser.includes(id);
  }

  searchFotResults() {
    const search = this.resetLastSearch()
    let resultCounter = 0;
    for (let personKey = 0; personKey < this.service.allKeys!.length; personKey++) {
      if (search.length == 0) {
        this.searchResults.push(this.service.allKeys![personKey]);
        resultCounter += 1;
        this.searchHasResults = true;
      } else {
        const person = this.PreparePersonForSearch(this.service.allKeys![personKey]);
        const result = this.search(person, this.service.allKeys![personKey], search);
        resultCounter = result ? resultCounter + 1 : resultCounter;
      }
    }
    this.searchHasResults = resultCounter > 0 ? true : false;
  }

  resetLastSearch() {
    this.searchResults = [];
    this.searchHasResults = false;
    return this.service.search.toLowerCase();
  }

  PreparePersonForSearch(personKey: string = '') {
    let obj = { firstname: '', secondname: '', inital: '' };
    obj.firstname = this.service.allUser![personKey].firstname.toLowerCase();
    obj.secondname = this.service.allUser![personKey].secondname.toLowerCase();
    obj.inital = this.service.allUser![personKey].inital.toLowerCase();
    return obj;
  }

  search(person: Person, personId: string = '', search: string = '') {
    const keys = Object.keys(person) as Array<keyof Person>;
    for (let i = 0; i < keys.length; i++) {
      if (person[keys[i]].includes(search)) {
        this.searchResults.push(personId);
        return true;
      }
    }
    return false;
  }

}


