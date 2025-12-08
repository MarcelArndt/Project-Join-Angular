import { TestBed } from '@angular/core/testing';

import { ContactFactoryService } from './contact-factory.service';

describe('ContactFactoryService', () => {
  let service: ContactFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
