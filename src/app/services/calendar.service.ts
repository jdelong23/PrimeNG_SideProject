import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
// Models
import { Router } from '@angular/router';

//observe required to see all headers and body
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) { }

  public updateStatus(subtopicId: number, status: number) {
   // let getEventsUrl = 'http://'
  }
}
