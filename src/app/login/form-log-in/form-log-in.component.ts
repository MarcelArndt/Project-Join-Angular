import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'form-log-in',
  imports: [IconComponent, FormsModule],
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss', './../../../checkbox.scss', './../../../form.scss']
})
export class FormLogInComponent {
  constructor(public router: Router) { }
  isFieldPassword: boolean = false;
  isCheckBox: boolean = false

  changeFieldType() {
    this.isFieldPassword = !this.isFieldPassword;
  }

  guestLogIn() {
    this.router.navigate(['main']);
  }

}
