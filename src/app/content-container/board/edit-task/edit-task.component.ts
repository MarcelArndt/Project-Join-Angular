import { Component} from '@angular/core';
import { EditTaskService } from '../../../service/edit-task.service';
import { MainFeaturesService } from '../../../service/main-features.service';
import { IconComponent } from '../../../icon/icon.component';
import { DatabaseService } from '../../../service/database.service';
import { TaskPayload, Tasks } from '../../../interface/interface';
import { PriorityInputComponent } from '../../add-task/form-add-task/priority-input/priority-input.component';
import { AssignedToInputComponent } from '../../add-task/form-add-task/assigned-to-input/assigned-to-input.component';
import { SubtaskInputComponent } from "../../add-task/form-add-task/subtask-input/subtask-input.component";
import { AssignedToInputService } from '../../add-task/form-add-task/assigned-to-input/assigned-to-input-service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LightboxService } from '../../../lightbox/lightbox.service';

@Component({
  selector: 'app-edit-task',
  imports: [IconComponent, PriorityInputComponent, AssignedToInputComponent, SubtaskInputComponent, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss', './../../../../form.scss',]
})
export class EditTaskComponent {

  constructor(
    public service: EditTaskService, 
    private main: MainFeaturesService, 
    private database: DatabaseService, 
    private assignService: AssignedToInputService,
    private lightBoxService: LightboxService,
  ){}

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), 
    description: new FormControl('', []),
    dueDate: new FormControl('', [Validators.required, this.minTodayValidator]),
  });


  dateToday?:string;
  currentID!:string;
  currentTask!:TaskPayload | null;

    closeOpenWinod(){
      if(!this.assignService.isFirstTimeVisit() && this.assignService.isMenuOpen()){
        this.assignService.closeMenu();
      }
    }

  ngOnInit(){
    this.dateToday = this.main.getCurrentDate();
    this.currentTask = structuredClone(this.database.currentSelectedTask);
    this.currentID = this.database.currentSelectedTaskID;
  }

  isValid():boolean{
    if(this.editForm.invalid || this.assignService.getData().length <= 0){
      return false
    }
    return true
  }

  getAssignedToValid(){
    return this.assignService.getData().length > 0
  }

  ngAfterViewInit(){
    this.fillValuesOfInputs()
  }

  fillValuesOfInputs(){
    this.editForm.get('name')?.setValue(this.currentTask?.name ||'');
    this.editForm.get('description')?.setValue(this.currentTask?.description ||'');
    this.editForm.get('dueDate')?.setValue(this.currentTask?.date ||'');
  }

  onPriorityChange(priority: '' | 'low'| 'medium' | 'urgent') {
    if(this.currentTask){
      this.currentTask.priority = priority as string;
    }
  }

  minTodayValidator(control: AbstractControl):ValidationErrors | null{
    const value = control.value;
    if (!value) return null;
    const selected = new Date(value);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
     return selected < today ? { minDate: true } : null;
  }


  onSave(){
    if( this.currentTask && this.currentID){
      this.database.overwriteCurrentSelectedTask(this.currentID, structuredClone(this.currentTask));
      this.lightBoxService.closeLightbox()
    }
  }

}
