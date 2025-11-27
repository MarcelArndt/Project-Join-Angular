import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-container',
  imports: [RouterOutlet,],
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss', './mobil-content-container.scss']
})
export class ContentContainerComponent {

}
