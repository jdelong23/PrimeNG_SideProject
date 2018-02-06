import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';
import { CalendarModule, Calendar } from 'primeng/calendar';

import { Subtopic } from '../models/subtopic.model';
import { CalendarStatusService } from '../services/calendar-status.service';
import { CalendarService } from '../services/calendar.service';


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


    @ViewChild('datePicker') datePicker: Calendar; 
    gotoDateValue: Date;

    constructor(private calendarService: CalendarService, private statusService: CalendarStatusService) { }

    ngOnInit() {
        console.log(this.datePicker);
        this.calendarService.getPaginatedSubtopics().subscribe(
            service => {
                this.subTopics = service;

                for (let subtopic of this.subTopics) {
                   
                    let color = this.statusService.getStatusColor(subtopic.status);
                    subtopic.color = color;

                    subtopic.className = ["test"];
                    
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
        this.fc.weekNumbers = true;
        //this.fc.hiddenDays = [2,4];
        this.fc.weekends = true;
        this.fc.eventLimit = 2;
        this.fc.nowIndicator = true;
        //this.fc.eventOverlap = false;
        this.fc.defaultDate = Date.now();
        //this.fc.defaultDate = "2-16-2018";
        this.fc.businessHours = {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [ 1, 2, 3, 4, 5 ], // Monday - Friday
        
            start: '9:00', // a start time (9am in this example)
            end: '17:00', // an end time (5pm in this example)
        }
        console.log(this.fc);
        
        
    }
    
    addThreeMonths(fc) {
        let m = fc.getDate();
        m.stripTime();
        this.fc.defaultDate = m;
        console.log(this.fc.defaultDate.toString());
        //fc.incrementDate({'months' : 3});

    }

    minusThreeMonths(fc) {
        fc.incrementDate({'months' : -3});

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
        console.log(calendar);
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

    externalDropEvent(event) {
        console.log(event);
        console.log(event.date);
    }

    mapSubtopic(subtopicEvent): Subtopic {
        let subtopic = new Subtopic();
        subtopic = subtopicEvent;
        subtopic.start = new Date(subtopicEvent.start.format());
        return subtopic;
    }

    /*Date Picker Events*/
    jumpToDate(date)
    {
        this.fc.gotoDate(date);
        this.fc.changeView("agendaDay");
    }

}


