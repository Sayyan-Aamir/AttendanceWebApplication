import { TestBed } from '@angular/core/testing';

import { Ng4LoadingSpinnerServiceService } from './ng4-loading-spinner-service.service';

describe('Ng4LoadingSpinnerServiceService', () => {
  let service: Ng4LoadingSpinnerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ng4LoadingSpinnerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
