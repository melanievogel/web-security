import { TestBed, inject } from '@angular/core/testing';

import { MateService } from './mate.service';

describe('MateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MateService]
    });
  });

  it('should be created', inject([MateService], (service: MateService) => {
    expect(service).toBeTruthy();
  }));
});
