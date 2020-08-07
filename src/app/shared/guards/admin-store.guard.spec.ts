import { TestBed } from '@angular/core/testing';

import { AdminStoreGuard } from './admin-store.guard';

describe('AdminStoreGuard', () => {
  let guard: AdminStoreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminStoreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
