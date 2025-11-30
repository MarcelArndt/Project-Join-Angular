import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { EditTaskService } from '../../../service/edit-task.service';
import { MainFeaturesService } from '../../../service/main-features.service';
import { IconComponent } from '../../../icon/icon.component';
import { DatabaseService } from '../../../service/database.service';
import { TaskPayload, Tasks } from '../../../interface/interface';
import { PriorityInputComponent } from '../../add-task/form-add-task/priority-input/priority-input.component';
import { AssignedToInputComponent } from '../../add-task/form-add-task/assigned-to-input/assigned-to-input.component';
import { CategoryInputComponent } from '../../add-task/form-add-task/category-input/category-input.component';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule, IconComponent, PriorityInputComponent, AssignedToInputComponent],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss', './../../../../form.scss',]
})
export class EditTaskComponent {
  constructor(public service: EditTaskService, private main: MainFeaturesService, private database: DatabaseService){}
  dateToday?:string;
  currentID!:string;
  currentTask!:TaskPayload | null;

  ngOnInit(){
    this.dateToday = this.main.getCurrentDate();
    this.currentTask = structuredClone(this.database.currentSelectedTask);
    this.currentID = this.database.currentSelectedTaskID;
    
  }

  onPriorityChange(priority: '' | 'low'| 'medium' | 'urgent') {
    if(this.currentTask){
      this.currentTask.priority = priority as string;
    }
  }


  onSave(){
    if( this.currentTask && this.currentID){
      this.database.overwriteCurrentSelectedTask(this.currentID, structuredClone(this.currentTask));
    }
  }

}
