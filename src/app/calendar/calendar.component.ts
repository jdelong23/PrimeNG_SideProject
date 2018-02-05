import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';

import { Subtopic } from '../models/subtopic.model';
import { CalendarStatusService } from '../services/calendar-status.service';
import { CalendarService } from '../services/calendar.service';
import { error } from 'selenium-webdriver';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    @ViewChild('fc') fc: Schedule;
    events: any[] = [];

    subTopics: any;
    subtopic: Subtopic;

    constructor(private calendarService: CalendarService, private statusService: CalendarStatusService) { }

    ngOnInit() {

        this.calendarService.getPaginatedSubtopics().subscribe(
            service => {
                this.subTopics = service;

                for (let subtopic of this.subTopics) {
                    console.log(subtopic);
                    let color = this.statusService.getStatusColor(subtopic.status);
                    subtopic.color = color;
                    this.events.push(subtopic);
                }
                this.fc.events = this.events;
            }
        );

        this.fc.header = {
            left: 'prevYear,nextYear',
            center: 'title',
            right: 'today prev,next'
        }

        this.fc.defaultView = "month";
    }

    back(fc) {
        //fc.prev();
        fc.next();
    }

    handleEventClick($event) {
        var clickedTopic = $event.calEvent;
        let subtopic = this.mapSubtopic(clickedTopic);

        clickedTopic.status = this.statusService.getNextStatus(subtopic);
        clickedTopic.color = this.statusService.getStatusColor(clickedTopic.status);
        
        this.calendarService.updateStatus(22506, subtopic).subscribe();
        this.fc.updateEvent(clickedTopic);
    }

    handleEventDrop(calendar) {
        var droppedTopic = calendar.event;
        let subtopic = this.mapSubtopic(droppedTopic);
        const milliDate = subtopic.start.getTime();

        droppedTopic.status = this.statusService.getMovedStatus(subtopic);
        droppedTopic.color = this.statusService.getStatusColor(droppedTopic.status);

        //update date and status synchronously
        this.calendarService.updateDate(22506, droppedTopic.subtopicId, milliDate)
        .subscribe(response => {
            this.calendarService.updateStatus(22506, subtopic).subscribe();
        });
        
        this.fc.updateEvent(droppedTopic);
    }

    mapSubtopic(subtopicEvent): Subtopic {
        let subtopic = new Subtopic();
        subtopic = subtopicEvent;
        subtopic.start = new Date(subtopicEvent.start.format());
        return subtopic;
    }
}


