import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../../../service/database.service';
import { TaskPayload, TaskWithId } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../icon/icon.component';
import { BurgermenuComponent } from '../../../burgermenu/burgermenu.component';
import { BoardService } from '../../../service/board.service';
import { LightboxService } from '../../../lightbox/lightbox.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { SearchService } from '../search-task-component/search.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-board-task-cards',
  imports: [CommonModule, IconComponent, BurgermenuComponent],
  templateUrl: './board-task-cards.component.html',
  styleUrl: './board-task-cards.component.scss'
})
export class BoardTaskCardsComponent {
  constructor(public database: DatabaseService, public service: BoardService, private cdr: ChangeDetectorRef, private lightboxService: LightboxService, private searchService:SearchService ) { }
  @Input() taskId: string = '';
  @Input() oderNumberInColoumn: number = 0;
  @ViewChild('card') card!: ElementRef;


  AmountOfSubtaskAreDone: number = 0;
  lengthOfTaskBar: string = '0px'
  taskOnSearchResults:string[] = []


  get task() {
    return this.database.tasks[this.taskId] as TaskPayload;
  }

  get allSubTaskKeys() {
    return Object.keys(this.task.subTasks || []);
  }


  ngAfterViewInit() {
    this.card.nativeElement.id = this.taskId;
    this.checkForResultInSearch();
    this.cdr.detectChanges()
  }


  get isOnSearch(){
   
    return this.searchService.isOnSearch
  }

  checkForResultInSearch(){
    this.searchService.results$.pipe(
    distinctUntilChanged(),
      map(tasks => tasks?.map(t => t.id) ?? []),
      tap(ids => this.taskOnSearchResults = ids),
    ).subscribe(() =>{

    })
  }

get amountOfSubtaskAreDone(): number {
  return this.allSubTaskKeys.filter(idOfSubtask => 
    this.task?.subTasks?.[idOfSubtask]?.isDone
  ).length;
}

get lengthOfSubtaskBar(): string {
  const total = this.allSubTaskKeys.length;
  if (total === 0) return '0%';
  
  const percentage = Math.floor((this.amountOfSubtaskAreDone / total) * 100);
  return `${percentage}%`;
}

    getTaskPriority(task: TaskPayload | undefined) {
      if (!task) return null;
      const key = task.priority as keyof typeof values;
      const values = {
        urgent: {icon: 'double_arrow', class: 'rotate-270deg'},
        medium: {icon: 'drag_handle', class: 'rotate-0deg'},
        low: {icon: 'double_arrow', class: 'rotate-90deg'},
      } as const;

      return values[key];
    }


  preventClick(event: Event) {
    event.stopPropagation();
  }

  startToDrag(event: DragEvent) {
    this.card.nativeElement.id = this.taskId;
    this.service.setCurrentDragElement(this.card.nativeElement);
    this.service.setisOnDragOn();
  }

  stopToDrag() {
    this.service.resetCurrentDragElement();
    this.service.setisOnDragOff();
  }

  openLightBoxForEdit(id:string){
    this.service.setCurrentId(id);
    this.database.setTaskToCurrentSelectedTask(id);
    this.lightboxService.openLightBox(EditTaskComponent);
  }


}
