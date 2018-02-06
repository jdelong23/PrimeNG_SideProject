import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, Schedule, } from 'primeng/schedule';
import {CalendarModule, Calendar} from 'primeng/calendar';
import {DragDropModule} from 'primeng/dragdrop';

import { Subtopic } from '../models/subtopic.model';
import { CalendarStatusService } from '../services/calendar-status.service';
import { CalendarService } from '../services/calendar.service';

//import * as $ from 'jquery';
//import $ui from 'jquery-ui';
declare var $: any;

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
        

        $('.fc-event').draggable( 
        {   
            zIndex: 999,
            revert: true,      // immediately snap back to original position
            revertDuration: 0  //
        });
       

        console.log(this.datePicker);
        this.calendarService.getPaginatedSubtopics().subscribe(
            service => {
                this.subTopics = service;

                for (let subtopic of this.subTopics) {
                   
                    let color = this.statusService.getStatusColor(subtopic.status);
                    subtopic.color = color;

                    //subtopic.className = ["test"];
                    
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

        
        if(window.innerWidth < 1000)
        {
            this.fc.defaultView = "listMonth";
            this.fc.header = {
                left: 'agendaDay,basicWeek,listMonth',
                center: 'title',
                right: 'today prev,next'
            }
        }
        
        this.fc.navLinks = true;
        this.fc.weekNumbers = false;
        //this.fc.hiddenDays = [2,4];
        this.fc.weekends = true;
        this.fc.eventLimit = 2;
        this.fc.nowIndicator = false;
        //this.fc.eventOverlap = false;
        this.fc.defaultDate = Date.now();
        //this.fc.defaultDate = "2-16-2018";
        this.fc.businessHours = {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [ 1, 2, 3, 4, 5 ], // Monday - Friday
        
            start: '9:00', // a start time (9am in this example)
            end: '17:00', // an end time (5pm in this example)
        }
        this.fc.droppable = true;
        
        this.fc.options = 
        {
            longPressDelay: 100
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
        console.log($event);
        var clickedTopic = $event.calEvent;
        clickedTopic.status = this.statusService.getNextStatus(clickedTopic.status);
        clickedTopic.color = this.statusService.getStatusColor(clickedTopic.status);
        
        let subtopic = this._mapSubtopic(clickedTopic);
        //console.log(subtopic);
        this.calendarService.updateStatus(22506, subtopic).subscribe();
        this.fc.updateEvent(clickedTopic);
    }

    handleEventDrop(calendar) {
        //console.log(calendar.event.start.format());
        const date = new Date(calendar.event.start.format());
        const milliDate = date.getTime();

        this.calendarService.updateDate(22506, calendar.event.subtopicId, milliDate).subscribe();
    }

    handleDayClick($event)
    {
        console.log($event.view);
    }

    handleDrop($event){
        
        console.log("you made it to handle drop!");
        console.log($event.ui.helper.html());
        console.log($event.date.format());

        let e = {title: $event.ui.helper.html(), start:$event.date.format()};
        console.log(e);
        //this.events.push(e);
        this.fc.events.push(e);
        console.log(this.fc.events);
        
        
    }
    _mapSubtopic(subtopicEvent): Subtopic {
        let subtopic = new Subtopic();
        subtopic = subtopicEvent;
        return subtopic;
    }

    /*Date Picker Events*/
    jumpToDate(date)
    {
        this.fc.gotoDate(date);
        this.fc.changeView("agendaDay");
    }

}


