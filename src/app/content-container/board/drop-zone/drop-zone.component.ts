import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { BoardService } from '../../../service/board.service';
import { DatabaseService } from '../../../service/database.service';

@Component({
  selector: 'app-drop-zone',
  imports: [IconComponent],
  templateUrl: './drop-zone.component.html',
  styleUrl: './drop-zone.component.scss'
})
export class DropZoneComponent {
  constructor(public service: BoardService, private database: DatabaseService) { }
  @Input() dropId: number = 0;

  receiveDrop(event: DragEvent) {
    if (!this.service.currentDragElement?.id) return;
    this.database.setProgressToTask(this.service.currentDragElement.id, this.dropId);
    this.service.resetCurrentDragElement();
    this.service.setisOnDragOff();
  }


  allowDrop(event: Event) {
    event.preventDefault();
  }
}
