import { Injectable } from '@angular/core';

enum Status {
  PENDING = 1,
  COMPLETED,
  CANCELED,
  MISSED
}

@Injectable()
export class CalendarStatusService {

  constructor() { }

  public getStatusColor(status: number): string {
    switch (status) {
      case (Status.PENDING):
        return 'blue';
      case (Status.COMPLETED):
        return 'green';
      case (Status.CANCELED):
        return 'red';
      case (Status.MISSED):
        return 'yellow';
      default:
        return 'blue';
    }
  }
}
