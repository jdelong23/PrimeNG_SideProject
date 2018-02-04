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
                    //console.log(JSON.stringify(service));
                    this.subTopics = JSON.parse(service._body);
                    for (let i = 0; i < this.subTopics.length; i++) {
                        this.events.push ( {
                            'title': this.subTopics[i].subtopicName.name,
                            'start': new Date(this.subTopics[i].subtopicDate).toDateString(),
                            'subtopicId': this.subTopics[i].subtopicId
                        });
                    }

                    // this.events.push ( {
                    //     'title': this.subTopics[1].subtopicName.name,
                    //     'start': this.subTopics[1].subtopicDate
                    // });

                    this.fc.events = this.events;
                }
        );
        // this.fc.aspectRatio = 2;
        this.fc.header = {
            left: 'prevYear,nextYear',
            center: 'title',
            right: 'today prev,next'
        }
        // this.fc.weekends = false;

        this.fc.defaultView = "month";

         this.subtopic = new Subtopic("My Custom Event", "2018-02-19", 1);
         //this.events = new Array<any>();
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
    
    handleEventDrop(calander) {
        console.log(calander.event.start.format());
        const date = new Date(calander.event.start.format());
        const miliDate = date.getTime();

        this.calendarService.updateDate(22506, calander.event.subtopicId, miliDate).subscribe();
    }
}


