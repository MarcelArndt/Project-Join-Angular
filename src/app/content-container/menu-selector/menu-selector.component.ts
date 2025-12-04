import { Component,Input, HostListener } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { MenuSelectorService } from './menu-selector.service';
import { CommonModule } from '@angular/common';


export interface Option {
  name:string;
  value:string | number;
  callback?: () => void;
}

@Component({
  selector: 'app-menu-selector',
  imports: [IconComponent,CommonModule],
  templateUrl: './menu-selector.component.html',
  styleUrl: './menu-selector.component.scss'
})


export class MenuSelectorComponent {
  constructor(private menuService: MenuSelectorService){}

  @HostListener('document:click', ['$event'])
      onDocumentClick(event: MouseEvent) {
      if(this.menuService.isTouched() && this.menuService.isMenuOpen()){
        this.menuService.closeMenu();
      }
    }

  @Input({required:true}) options!:Option[];

  get AllOptions(){
    return this.options;
  }

  handleClick(option: Option) {
    option.callback?.();
  }

  toggleMenu(){
    this.menuService.toggleMenu()
  }

  ngOnDestroy(){
    this.menuService.reset();
  }

  closeMenu(){
    this.menuService.closeMenu()
  }

  get isMenuOpen(){
    return this.menuService.isMenuOpen()
  }

  preventClick(event:Event){
    event.stopPropagation();
  }

  setValue(value:string | number){
    this.menuService.setValue(value);
    this.menuService.closeMenu();
  }

  get currentValue(): string {
    const match = this.AllOptions.find(
      option => option.value === this.menuService.currentValue()
    );
    return match ? match.name : 'select an Option';
  }

  get isValid(){
    return this.menuService.isValid()
  }

  get isTouched(){
      return this.menuService.isTouched()
  }



}
