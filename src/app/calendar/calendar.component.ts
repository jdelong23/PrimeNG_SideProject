import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    @ViewChild("fc") fc: Schedule;
    events: any[];
    constructor() { }

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
        this.fc.timezone = "local";
        
        this.events = [
            {
                "title": "Project 3 showcase",
                "start": 1518573600000
            },
            {
                "title": "Docker",
                "start": "2018-02-08",
                "end": "2018-02-12"
            },
            {
                "title": "Microservices",
                "start": "2018-02-05",
                "end": "2018-02-08"
            },
            {
                "title": "QC",
                "start": "2018-02-05T14:00:00",
                "end": "2018-02-05T15:00:00"
            },

            {
                "title": "QC",
                "start": "2018-02-12T14:00:00",
                "end": "2018-02-12T15:00:00"
            },
            {
                "title": "Angular Review",
                "start": "2018-01-29",
                "end": "2018-01-29"
            }
        ];

        this.fc.events = this.events;
        // console.log(this.fc.events);
        // this.fc.events.map((obj: any) => {
        //     obj.color = "orange";
        //     // obj.title = "testin";
        // });

        //this.fc.defaultDate = "2017-2-1"


    }

    back(fc) {
        //fc.prev();
        fc.next();
    }
    handleEventClick($event) {
        console.log($event.calEvent);
        $event.calEvent.color = "orange";
        //e.jsEvent = Browser click event
        console.log($event.calEvent);
        this.fc.updateEvent($event.calEvent);
    }
    handleEventDrop(calendar)
    {
        calendar.event.color = "orange";
        console.log(calendar.delta.asDays());
        console.log(calendar.event.start.toString())
        console.log(calendar.event.start.format());
        //$event.calEvent.color = "orange";
        this.fc.updateEvent(calendar.event);
    }
}


