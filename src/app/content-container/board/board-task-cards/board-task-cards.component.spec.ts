import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskCardsComponent } from './board-task-cards.component';

describe('BoardTaskCardsComponent', () => {
  let component: BoardTaskCardsComponent;
  let fixture: ComponentFixture<BoardTaskCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTaskCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
