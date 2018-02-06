import { Component, OnInit, Input } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { Subtopic } from '../models/subtopic.model';

//import * as $ from 'jquery';
//import $ui from 'jquery-ui';
declare var $: any;

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})


export class DraggableComponent implements OnInit {
  @Input()
  subtopic: Subtopic

  constructor() { }

  ngOnInit() {
    this.subtopic = new Subtopic;
    this.subtopic.title = 'HELLO';

    $('.fc-event').draggable(
      {
        zIndex: 999,
        revert: true,      // immediately snap back to original position
        revertDuration: 0  //
      });
    $('.fc-event').data(
        'mySubtopic', this.subtopic
    );
  }
}
