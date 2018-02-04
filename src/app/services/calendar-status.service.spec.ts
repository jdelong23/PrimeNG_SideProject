import { TestBed, inject } from '@angular/core/testing';

import { CalendarStatusService } from './calendar-status.service';

describe('CalendarStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarStatusService]
    });
  });

  it('should be created', inject([CalendarStatusService], (service: CalendarStatusService) => {
    expect(service).toBeTruthy();
  }));
});
