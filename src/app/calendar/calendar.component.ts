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
        console.log(clickedTopic.title);
        clickedTopic.status++;
        if (clickedTopic.status > 4) {
            clickedTopic.status = 1;
        }
        let color = this.statusService.getStatusColor(clickedTopic.status);
        clickedTopic.color = color;
        this.fc.updateEvent(clickedTopic);
    }

    handleEventDrop(calendar) {
        //console.log(calendar.event.start.format());
        const date = new Date(calendar.event.start.format());
        const milliDate = date.getTime();

       
        console.log(milliDate);
        console.log(calendar.event.subtopicId);

        this.calendarService.updateDate(22506, calendar.event.subtopicId, milliDate).subscribe();
    }
}


