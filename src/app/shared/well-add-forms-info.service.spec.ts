import { TestBed, inject } from '@angular/core/testing';

import { WellAddFormsInfoService } from './well-add-forms-info.service';

describe('WellAddFormsInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WellAddFormsInfoService]
    });
  });

  it('should be created', inject([WellAddFormsInfoService], (service: WellAddFormsInfoService) => {
    expect(service).toBeTruthy();
  }));
});
