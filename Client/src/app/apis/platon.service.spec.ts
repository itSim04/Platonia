import { TestBed } from '@angular/core/testing';

import { PlatonService } from './platon.service';

describe('PlatonService', () => {
  let service: PlatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
