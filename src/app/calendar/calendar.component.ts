import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';
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

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {

        this.calendarService.getCount().subscribe(
            service => {
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




        this.fc.events = this.events;
        this.fc.events.map((obj: any) => {
            obj.color = "orange";
            // obj.title = "testin";
        });

        //this.fc.defaultDate = "2017-2-1"


    }

    back(fc) {
        //fc.prev();
        fc.next();
    }
    handleEventClick($event) {
        console.log($event);
    }
    handleEventDrop(calander) {
        console.log(calander.event.start.format());
        const date = new Date(calander.event.start.format());
        const miliDate = date.getTime();

        this.calendarService.updateDate(22506, calander.event.subtopicId, miliDate).subscribe();
    }
}


