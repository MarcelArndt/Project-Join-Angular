import { Component, HostListener } from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, } from '@angular/forms';
import { DatabaseService } from '../../../service/database.service';
import { SearchService } from './search.service';
import { debounceTime, distinctUntilChanged,tap, map } from 'rxjs';

@Component({
  selector: 'search',
  imports: [ IconComponent, ReactiveFormsModule],
  templateUrl: './search-task-component.component.html',
  styleUrl: './search-task-component.component.scss'
})
export class SearchTaskComponentComponent {

  constructor(private searchService:SearchService, private database: DatabaseService){}
  
  searchForm = new FormGroup ({
    search : new FormControl('', [Validators.minLength(3)])
  })


    @HostListener('document:click', ['$event'])
  
      onDocumentClick(event: MouseEvent) {
      if(this.searchService.isOnSearch){
        this.searchService.isOnSearch = false;
      }
    }

  ngOnInit(){
    const dateBase = this.database.getAllTasks()
    this.searchService.initSearch()
    this.initSearch();
  }

  preventOnClick(event:Event){
    event.stopPropagation()
  }

  startSearchOnKlick(){
    const control = this.searchForm.get('search');
    if(!control || !control.value || control.value.length < 3) return
    this.searchService.isOnSearch = true;
  }

  
  initSearch(){
    const control = this.searchForm.get('search');
    if (!control || control.invalid) return;

      control.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          map(value => this.searchService.search(value ?? '')),
          
        )
        .subscribe(()=>{
            this.searchService.isOnSearch = true;
        });
  }

  ngOnDestroy(){
    const control = this.searchForm.get('search');
    if(!control) return;
    control.setValue('');
  }


}
