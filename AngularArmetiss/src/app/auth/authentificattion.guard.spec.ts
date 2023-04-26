import { TestBed } from '@angular/core/testing';

import { AuthentificattionGuard } from './authentificattion.guard';

describe('AuthentificattionGuard', () => {
  let guard: AuthentificattionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentificattionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
