import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'form-log-in',
  imports: [IconComponent, ReactiveFormsModule],
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss', './../../../checkbox.scss', './../../../form.scss']
})
export class FormLogInComponent {
  constructor(public router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
  });

  isFieldPassword: boolean = false;
  isCheckBox: boolean = false

  changeFieldType() {
    this.isFieldPassword = !this.isFieldPassword;
  }

  guestLogIn() {
    this.router.navigate(['main']);
  }
  
  resetForm(){
    this.loginForm.reset();
  }

}
