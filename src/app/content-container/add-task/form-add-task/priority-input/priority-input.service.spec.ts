import { TestBed } from '@angular/core/testing';

import { PriorityInputService } from './priority-input.service';

describe('PriorityInputService', () => {
  let service: PriorityInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorityInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
