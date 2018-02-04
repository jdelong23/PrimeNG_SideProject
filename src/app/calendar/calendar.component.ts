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
            left: 'agendaDay,basicWeek,month listMonth',
            center: 'title',
            right: 'today prev,next'
        }

        //this.fc.defaultView = "month";
        this.fc.navLinks = true;
        //this.fc.weekNumbers = true;
        //this.fc.hiddenDays = [2,4];
        //this.fc.weekends = false;
        this.fc.eventLimit = 2;
        this.fc.nowIndicator = true;
        //this.fc.eventOverlap = false;
    }

    back(fc) {
        //fc.prev();
        fc.next();
    }

    handleEventClick($event) {
        var clickedTopic = $event.calEvent;
        clickedTopic.status = this.statusService.getNextStatus(clickedTopic.status);
        clickedTopic.color = this.statusService.getStatusColor(clickedTopic.status);
        
        let subtopic = this._mapSubtopic(clickedTopic);
        console.log(subtopic);
        this.calendarService.updateStatus(22506, subtopic).subscribe();
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

    _mapSubtopic(subtopicEvent): Subtopic {
        let subtopic = new Subtopic();
        subtopic = subtopicEvent;
        return subtopic;
    }
}


