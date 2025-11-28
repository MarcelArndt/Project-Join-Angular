import { TestBed } from '@angular/core/testing';

import { AssignedToInputService } from './assigned-to-input-service';

describe('AssignedToInputServiceService', () => {
  let service: AssignedToInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedToInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
