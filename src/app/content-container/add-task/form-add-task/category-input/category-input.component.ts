import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../../../../interface/interface';
import { DatabaseService } from '../../../../service/database.service';
@Component({
  selector: 'app-category-input',
  imports: [FormsModule, CommonModule, IconComponent],
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.scss', './../drop-down-menu.scss']
})
export class CategoryInputComponent {
  constructor(public service: AddTaskService, public database: DatabaseService) { }

  @Input() OnHoverIsValid: boolean = false;
  @Input() form?: NgForm;
  toggleCategoryWindow() {
    this.service.categoryObj.firstTimeVisit = false;
    this.service.categoryObj.open = !this.service.categoryObj.open
    this.service.checkForValidationinForm(this.form!, false);
  }

  setCategory(obj: Category) {
    this.service.newTask.category = obj;
    this.service.categoryObj.currentName = obj.name;
    this.service.newTask.category = obj;
    this.service.categoryObj.open = false;
    this.service.search = '';
    this.service.checkForValidationinForm(this.form!, false);
  }

}
