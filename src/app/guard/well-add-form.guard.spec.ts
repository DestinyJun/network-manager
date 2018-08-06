import { TestBed, async, inject } from '@angular/core/testing';

import { WellAddFormGuard } from './well-add-form.guard';

describe('WellAddFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WellAddFormGuard]
    });
  });

  it('should ...', inject([WellAddFormGuard], (guard: WellAddFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
