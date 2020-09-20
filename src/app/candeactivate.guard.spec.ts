import { TestBed } from '@angular/core/testing';

import { CandeactivateGuard } from './candeactivate.guard';

describe('CandeactivateGuard', () => {
  let guard: CandeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
