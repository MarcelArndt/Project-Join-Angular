import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { FormGroup, ReactiveFormsModule, Validator, FormControl, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderService} from '../../content-slider/slider.service';

@Component({
  selector: 'form-sign-up',
  imports: [IconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss', './../../../checkbox.scss', './../../../form.scss']
})
export class FormSignUpComponent {
  constructor(public sliderservice: SliderService ){}

  signInForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
    name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatedPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
    checkbox : new FormControl('' , [Validators.requiredTrue])
  },{ validators: this.repeatPasswordValidator });

  repeatPasswordValidator(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password')?.value;
    const repeatedPassword = control.get('repeatedPassword')?.value;
    return repeatedPassword === password ? null : { repeatPasswordMismatch: true }
  }

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


  resetForm(){
    this.signInForm.reset()
  }



}
