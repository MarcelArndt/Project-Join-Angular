import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForSummaryComponent } from './card-for-summary.component';

describe('CardForSummaryComponent', () => {
  let component: CardForSummaryComponent;
  let fixture: ComponentFixture<CardForSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardForSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
