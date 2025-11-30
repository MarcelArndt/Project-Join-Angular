import { TestBed } from '@angular/core/testing';

import { SubtaskInputService } from './subtask-input.service';

describe('SubtaskInputService', () => {
  let service: SubtaskInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtaskInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
