import { TestBed, inject } from '@angular/core/testing';

import { BurndownService } from './burndown.service';

describe('BurndownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BurndownService]
    });
  });

  it('should be created', inject([BurndownService], (service: BurndownService) => {
    expect(service).toBeTruthy();
  }));
});
