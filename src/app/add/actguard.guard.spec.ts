import { TestBed } from '@angular/core/testing';

import { ActguardGuard } from './actguard.guard';

describe('ActguardGuard', () => {
  let guard: ActguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
