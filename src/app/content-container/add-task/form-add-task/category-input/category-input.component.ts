import { Component, HostListener} from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Category } from '../../../../interface/interface';
import { DatabaseService } from '../../../../service/database.service';
import { CategoryInputService } from './category-input.service';
@Component({
  selector: 'app-category-input',
  imports: [FormsModule, CommonModule, IconComponent],
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.scss', './../drop-down-menu.scss']
})
export class CategoryInputComponent {
  constructor(public service: AddTaskService, public database: DatabaseService, public categoryService: CategoryInputService) { }

  @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      if(!this.categoryService.isFirstTimeVisit() && this.categoryService.isMenuOpen()){
        this.categoryService.closeMenu();
      }
  }

  ngOnInit(){
    this.categoryService.reset();
  }

  setChoice(category:Category){
    this.categoryService.setCurrentChoice(category);
  }

  toggleMenu(){
    this.categoryService.toggleMenu();
  }

  preventClick(event:Event){
    event.stopPropagation();
  }

}
