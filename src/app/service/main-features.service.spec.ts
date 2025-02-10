import { TestBed } from '@angular/core/testing';

import { MainFeaturesService } from './main-features.service';

describe('MainFeaturesService', () => {
  let service: MainFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
