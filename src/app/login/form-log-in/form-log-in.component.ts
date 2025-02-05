import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'form-log-in',
  imports: [IconComponent, FormsModule],
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss', './checkbox.scss']
})
export class FormLogInComponent {
  isFieldPassword: boolean = true;
  isCheckBox: boolean = false

  changeFieldType() {
    this.isFieldPassword = !this.isFieldPassword;
  }

}
