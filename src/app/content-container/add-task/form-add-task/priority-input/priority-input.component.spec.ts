import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityInputComponent } from './priority-input.component';

describe('PriorityInputComponent', () => {
  let component: PriorityInputComponent;
  let fixture: ComponentFixture<PriorityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
