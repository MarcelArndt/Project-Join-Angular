import { TestBed } from '@angular/core/testing';

import { ContentRouterServiceService } from './content-router-service.service';

describe('ContentRouterServiceService', () => {
  let service: ContentRouterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentRouterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
