import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { AddTaskComponent } from './add-task/add-task.component';
@Component({
  selector: 'app-content-container',
  imports: [RouterOutlet, LightboxComponent, AddTaskComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss'
})
export class ContentContainerComponent {

}
