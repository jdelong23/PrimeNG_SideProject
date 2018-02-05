import { Injectable } from '@angular/core';
import { Subtopic } from '../models/subtopic.model';

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

  public getNextStatus(subtopic: Subtopic): string {
    var today = new Date().setHours(0, 0, 0, 0);
    var eventDay = subtopic.start.getTime();
    var later = today < eventDay;

    console.log(today);
    console.log(eventDay);

    switch (subtopic.status) {
      case (Status.PENDING):
        subtopic.status = Status.COMPLETED;
        break;
      case (Status.COMPLETED):
        subtopic.status = Status.CANCELED;
        break;
      case (Status.CANCELED):
        subtopic.status = Status.MISSED;
        break;
      case (Status.MISSED):
        subtopic.status = later ? Status.PENDING : Status.COMPLETED;
        break;
      default:
        subtopic.status = subtopic.status;
    }
    console.log(subtopic.status);

    return subtopic.status;
  }

  public getMovedStatus(subtopic: Subtopic): string {
    var today = new Date().setHours(0, 0, 0, 0);
    var eventDay = subtopic.start.getTime();
    var later = today < eventDay;

    if(subtopic.status == Status.PENDING || subtopic.status == Status.MISSED) {
      subtopic.status = later ? Status.PENDING : Status.MISSED;
    }

    return subtopic.status;
  }
}
