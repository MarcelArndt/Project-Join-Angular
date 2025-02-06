import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadNavigationComponent } from './head-navigation.component';

describe('HeadNavigationComponent', () => {
  let component: HeadNavigationComponent;
  let fixture: ComponentFixture<HeadNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
