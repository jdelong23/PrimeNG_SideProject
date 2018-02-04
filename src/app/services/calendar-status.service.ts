import { Injectable } from '@angular/core';

enum Status {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
  MISSED = "Missed"
}

@Injectable()
export class CalendarStatusService {

  constructor() { }

  public getStatusColor(status: string): string {
    switch (status) {
      case (Status.PENDING):
        return '#2a2f60';
      case (Status.COMPLETED):
        return 'green';
      case (Status.CANCELED):
        return '#912e2e';
      case (Status.MISSED):
        return '#c48013';
      default:
        return '#2a2f60';
    }
  }

  public getNextStatus(status: string): string {
    switch (status) {
      case (Status.PENDING):
        return Status.COMPLETED;
      case (Status.COMPLETED):
        return Status.CANCELED;
      case (Status.CANCELED):
        return Status.MISSED;
      case (Status.MISSED):
        return Status.PENDING;
      default:
        return Status.COMPLETED;
    }
  }
}
