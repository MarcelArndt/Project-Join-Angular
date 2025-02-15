import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainFeaturesService } from '../../../../service/main-features.service';
import { AllSubTask } from '../../../../interface/interface';


@Component({
  selector: 'app-subtask-input',
  imports: [FormsModule, CommonModule, IconComponent,],
  templateUrl: './subtask-input.component.html',
  styleUrls: ['./subtask-input.component.scss', './../drop-down-menu.scss']
})
export class SubtaskInputComponent {
  constructor(public service: AddTaskService, private mainFeatures: MainFeaturesService) { }
  @ViewChild('addSubTaskInput') addSubTaskInput!: ElementRef<HTMLInputElement>;

  newSubTask: string = '';
  backUpOfSubTask: string = '';

  toggleAddSubTaskWindow() {
    this.service.addSubTaskObj.firstTimeVisit = false;
    this.service.addSubTaskObj.open = !this.service.addSubTaskObj.open
    this.service.addSubTaskObj.currentTask = '';
    if (this.service.addSubTaskObj.open) {
      setTimeout(() => { this.addSubTaskInput.nativeElement.focus(); }, 250)
    }
  }

  setSubTask() {
    if (this.service.addSubTaskObj.currentTask.length <= 0) return;
    const id = this.mainFeatures.getNewId();
    if (!this.service.addSubTaskObj.allSubTasks) {
      this.service.addSubTaskObj.allSubTasks = {} as AllSubTask;
    }
    this.service.addSubTaskObj.allSubTasks[id] = { text: this.service.addSubTaskObj.currentTask, inOnEdit: false, isDone: false };
    this.service.allSubTaskKey = Object.keys(this.service.addSubTaskObj.allSubTasks);
    this.toggleAddSubTaskWindow();
  }


  deleteSubTaskbById(id: string) {
    delete this.service.addSubTaskObj.allSubTasks[id];
    this.service.allSubTaskKey = Object.keys(this.service.addSubTaskObj.allSubTasks);
  }

  openEditById(id: string) {
    this.service.addSubTaskObj.allSubTasks[id].inOnEdit = true;
    this.backUpOfSubTask = this.service.addSubTaskObj.allSubTasks[id].text;
  }

  restoreEditById(id: string) {
    this.service.addSubTaskObj.allSubTasks[id].text = this.backUpOfSubTask;
    this.backUpOfSubTask = '';
  }

  closeEditById(id: string) {
    this.service.addSubTaskObj.allSubTasks[id].inOnEdit = false;
  }

}
