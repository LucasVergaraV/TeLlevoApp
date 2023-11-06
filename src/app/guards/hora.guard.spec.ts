import { TestBed } from '@angular/core/testing';

import { HoraGuard } from './hora.guard';

describe('HoraGuard', () => {
  let guard: HoraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HoraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
