import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';
import { Subtopic } from '../models/subtopic.model';
import { CalendarStatusService } from '../services/calendar-status.service';
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    @ViewChild("fc") fc: Schedule;
    events: Subtopic[];
    subtopic: Subtopic;
    constructor(private statusService: CalendarStatusService) { }

    ngOnInit() {
        console.log(this.fc);
        //this.fc.aspectRatio = 2;
        this.fc.header = {
            left: 'prevYear,nextYear',
            center: 'title',
            right: 'today prev,next'
        }
        this.fc.weekends = false;

        this.fc.defaultView = "month";

        this.subtopic = new Subtopic("My Custom Event", "2018-02-19", 1);
        this.events = new Array<any>();
        this.events.push(this.subtopic);

        this.fc.events = this.events;
        console.log(this.fc.events);

    }

    back(fc) {
        //fc.prev();
        fc.next();
    }

    handleEventClick($event) {
        var clickedTopic = $event.calEvent;
        console.log(clickedTopic.title);
        clickedTopic.status++;
        if(clickedTopic.status > 4) {
            clickedTopic.status = 1;
        }
        let color = this.statusService.getStatusColor(clickedTopic.status);
        clickedTopic.color = color;
        this.fc.updateEvent(clickedTopic);
        
    }
}


