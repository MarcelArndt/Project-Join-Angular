import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTaskComponentComponent } from './search-task-component.component';

describe('SearchTaskComponentComponent', () => {
  let component: SearchTaskComponentComponent;
  let fixture: ComponentFixture<SearchTaskComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTaskComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
