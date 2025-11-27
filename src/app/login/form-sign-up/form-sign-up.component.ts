import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderService} from '../../content-slider/slider.service';

@Component({
  selector: 'form-sign-up',
  imports: [IconComponent, FormsModule, CommonModule],
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss', './../../../checkbox.scss', './../../../form.scss']
})
export class FormSignUpComponent {
  constructor(public sliderservice: SliderService ){}
  @Output() switchEvent = new EventEmitter<void>();
  isFieldPassword: boolean = false;
  isCheckBox: boolean = false
  isInAnimation: boolean = false;

  changeFieldType() {
    this.isFieldPassword = !this.isFieldPassword;
  }

  siwtchToLogIn() {
    this.switchEvent.emit();
    this.isInAnimation = true;
    setTimeout(() => {
      this.isInAnimation = false;
    }, 1000);
  }




}
