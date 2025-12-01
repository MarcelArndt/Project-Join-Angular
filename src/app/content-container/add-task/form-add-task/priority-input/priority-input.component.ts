import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { PriorityInputService } from './priority-input.service';

@Component({
  selector: 'app-priority-input',
  imports: [CommonModule, IconComponent],
  templateUrl: './priority-input.component.html',
  styleUrl: './priority-input.component.scss'
})
export class PriorityInputComponent {
  constructor(private  priorityService : PriorityInputService ){}
  @Input() setStateOnInit!:string | undefined;

  get value(){
    return this.priorityService.currentValue();
  }

  setPriority(value:'' | 'low'| 'medium' | 'urgent'){
  if (this.value === value) {
        this.priorityService.setValue('');
      } else if (this.value != value) {
        this.priorityService.setValue(value);
      }
  }

}
