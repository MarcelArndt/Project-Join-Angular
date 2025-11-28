import { TestBed } from '@angular/core/testing';

import { CategoryInputService } from './category-input.service';

describe('CategoryInputService', () => {
  let service: CategoryInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
