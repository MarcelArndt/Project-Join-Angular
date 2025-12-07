import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'join';
  constructor(private databaseService: DatabaseService){}
 async ngOnInit(){
   await this.databaseService.initDatabase();
  }
}
