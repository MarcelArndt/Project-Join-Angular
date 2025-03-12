import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { FormSignUpComponent } from './form-sign-up/form-sign-up.component';
import { RouterModule } from '@angular/router';
import { SliderService } from '../content-slider/slider.service';
import { ContentSliderComponent } from '../content-slider/content-slider.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormLogInComponent, FormSignUpComponent, RouterModule, ContentSliderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'animation.scss']
})
export class LoginComponent {
  constructor(public sliderservice: SliderService ){}
  secondClassForLogo: string = 'animation';
  isSignUp: boolean = false;
  isInit: boolean = true;

  ngOnInit() {
    this.isInit = true;
    this.checkSessionStorage();
  }

  checkSessionStorage() {
    const storage = sessionStorage.getItem("animation");
    this.secondClassForLogo = storage != null ? "no-animation" : 'animation'
    if (!storage) sessionStorage.setItem("animation", "animation");
  }

}
