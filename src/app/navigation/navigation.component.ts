import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [IconComponent, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss', './mobil-navigation.scss']
})
export class NavigationComponent {

}
