import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLogInComponent } from './form-log-in/form-log-in.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormLogInComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  secondClassForLogo: string = 'animation';


  ngOnInit() {
    this.checkSessionStorage();
  }

  checkSessionStorage() {
    const storage = sessionStorage.getItem("animation");
    this.secondClassForLogo = storage != null ? "no-animation" : 'animation'
    if (!storage) sessionStorage.setItem("animation", "animation");
    console.log(this.secondClassForLogo);
  }
}
