import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IconComponent } from '../../../../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-input',
  imports: [CommonModule, IconComponent],
  templateUrl: './priority-input.component.html',
  styleUrl: './priority-input.component.scss'
})
export class PriorityInputComponent {
  @Input() setStateOnInit!:string | undefined;
  @Output() priorityChange = new EventEmitter<'' | 'low'| 'medium' | 'urgent'>();
  currentValue: '' | 'low'| 'medium' | 'urgent' = ''

  setPriority(value: '' | 'low'| 'medium' | 'urgent' = '') {
    if (this.currentValue === value) {
      this.currentValue = '';
    } else if (this.currentValue != value) {
      this.currentValue = value;
    }
    this.priorityChange.emit(this.currentValue);
  }

  ngOnInit(){
    if(this.setStateOnInit){
      this.currentValue = this.setStateOnInit as '' | 'low'| 'medium' | 'urgent';
    }
  }

  get value():'' | 'low'| 'medium' | 'urgent'{
      return this.currentValue
  }

}
