import { TestBed } from '@angular/core/testing';

import { TaskFactoryService } from './task-factory.service';

describe('TaskFactoryService', () => {
  let service: TaskFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
