import { Component } from '@angular/core';
import { MenuSelectorComponent } from '../menu-selector/menu-selector.component';
import { MenuSelectorService } from '../menu-selector/menu-selector.service';
import { DatabaseService } from '../../service/database.service';
import { TaskPayload } from '../../interface/interface';
import { IconComponent } from '../../icon/icon.component';
import { LightboxService } from '../../lightbox/lightbox.service';

@Component({
  selector: 'app-move-to-component',
  imports: [MenuSelectorComponent, IconComponent],
  templateUrl: './move-to-component.html',
  styleUrl: './move-to-component.scss'
})
export class MoveToComponent {
  constructor(private menuService:MenuSelectorService, private database: DatabaseService, private lightboxService:LightboxService){}

  currentTask!:TaskPayload;
  currentID!:string
  options =  [
      { name: 'To Do', value: 0 },
      { name: 'In Progress', value: 1 },
      { name: 'Await Feedback', value: 2 },
      { name: 'Done', value: 3 }
    ]

  closeOnClick(){
    if(this.menuService.isMenuOpen())
      this.menuService.closeMenu();
  }

  ngOnInit(){
    this.currentTask = this.database.getCurrentSelectedTask() as TaskPayload
    this.currentID = this.database.currentSelectedTaskID
  }

  get taskName():string{
    if(!this.currentTask) return ''
    return this.currentTask.name
  }

  
  get categoryColor():string{
    if(!this.currentTask) return ''
    return this.currentTask.category?.color || '#fff';
  }

  get categoryName():string{
    if(!this.currentTask) return ''
    return this.currentTask.category?.name || '';
  }

  preventClick(event:Event){
    event.stopPropagation();
  }

  get isValid():boolean{
    return this.menuService.isValid()
  }

  get newValueFromService(){
    const value = this.menuService.getValue();
    return typeof value === 'number' ? value : 0;
  }

  get isTouched():boolean{
    return this.menuService.isTouched()
  }

  get optionsValues() {
      return this.options.filter(obj => obj.value !== this.currentTask.progress);
  }

  get currentName(){
    const match = this.options.find(obj => obj.value === this.currentTask.progress);
    return match?.name || ''
  }

  onSave(value:number){
    this.currentTask.progress = value
    this.database.overwriteCurrentSelectedTask( this.currentID, structuredClone(this.currentTask))
    this.menuService.reset();
    this.lightboxService.closeLightbox()
  }

}
