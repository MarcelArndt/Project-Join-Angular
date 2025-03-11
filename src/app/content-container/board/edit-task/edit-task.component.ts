import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { EditTaskService } from '../../../service/edit-task.service';
import { MainFeaturesService } from '../../../service/main-features.service';
import { IconComponent } from '../../../icon/icon.component';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule, IconComponent ],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss', './../../../../form.scss',]
})
export class EditTaskComponent {
  constructor(public service: EditTaskService, private main: MainFeaturesService){}
  dateToday?:string;
  ngOnInit(){
    this.dateToday = this.main.getCurrentDate();
  }
}
