import { TestBed } from '@angular/core/testing';

import { PoeTypeService } from './poe-type.service';

describe('PoeTypeServiceService', () => {
  let service: PoeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
