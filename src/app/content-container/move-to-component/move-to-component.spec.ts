import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToComponent} from './move-to-component';

describe('MoveToComponentComponent', () => {
  let component: MoveToComponent;
  let fixture: ComponentFixture<MoveToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
