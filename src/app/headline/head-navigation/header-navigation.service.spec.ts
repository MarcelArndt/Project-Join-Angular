import { TestBed } from '@angular/core/testing';

import { HeaderNavigationService } from './header-navigation.service';

describe('HeaderNavigationService', () => {
  let service: HeaderNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
