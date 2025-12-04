import { TestBed } from '@angular/core/testing';

import { MenuSelectorService } from './menu-selector.service';

describe('MenuSelectorService', () => {
  let service: MenuSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
