import { Component, ElementRef, ViewChild, Input, HostListener} from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { AddTaskService } from '../../../../service/add-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainFeaturesService } from '../../../../service/main-features.service';
import { AllSubTask, SubTask, TaskPayload } from '../../../../interface/interface';
import { SubtaskInputService } from './subtask-input.service';

 interface BackSubTask {
  [id: string]: string; 
}



@Component({
  selector: 'app-subtask-input',
  imports: [FormsModule, CommonModule, IconComponent,],
  templateUrl: './subtask-input.component.html',
  styleUrls: ['./subtask-input.component.scss', './../drop-down-menu.scss']
})
export class SubtaskInputComponent {
  constructor(public service: AddTaskService, private mainFeatures: MainFeaturesService, public subtaskService: SubtaskInputService) { }
  @Input({required:true})currentTask!:TaskPayload;
  @ViewChild('addSubTaskInput') addSubTaskInput!: ElementRef<HTMLInputElement>;

  
  backUpOfSubTask: BackSubTask = {};

    @HostListener('document:click', ['$event'])
  
      onDocumentClick(event: MouseEvent) {
      if(!this.subtaskService.isFirstTimeVisit() && this.subtaskService.isMenuOpen()){
        this.subtaskService.closeMenu();
      }
    }

  ngOnInit(){
    this.subtaskService.initSubTaskService(this.currentTask)
    this.subtaskService.resetEvent$.subscribe(()=>{
      this.backUpOfSubTask = {}
    })
  }

  setSubTask() {
    if(!this.subtaskService.newSubTask) return;
    const newTask:SubTask = {
      text:this.subtaskService.newSubTask,
      inOnEdit:false,
      isDone:false,
    }
    this.subtaskService.setNewSubTask(newTask);
  }


  deleteSubTaskbById(id: string) {
    this.subtaskService.deleteSubTaskByID(id)
  }

  openEditById(id: string) {
    this.subtaskService.openEditMenuForSubTaskByID(id)
    this.backUpOfSubTask[id] = this.subtaskService.allSubTask()![id].text;
  }

  preventClick(event:Event){
    event.stopPropagation()
  }

  closeEditById(id: string) {
    this.subtaskService.closeEditMenuForSubTaskByID(id)
    this.subtaskService.allSubTask()![id].text = this.backUpOfSubTask[id]
    delete this.backUpOfSubTask[id];
  }

  saveEditById(id:string){
    this.subtaskService.closeEditMenuForSubTaskByID(id)
  }

}
