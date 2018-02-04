import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
// Models
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subtopic } from '../models/subtopic.model';

//observe required to see all headers and body
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class CalendarService {

  url = `http://localhost:9001/api/v1/calendar/subtopicspagination?batchId=22506&pageSize=34&pageNumber=0`;
  updateDateURL = `http://localhost:9001/api/v1/calendar/dateupdate`;
  updateStatusURL = 'http://localhost:9001/api/v1/calendar/statusupdate';


  constructor(private httpPost: HttpClient, private httpGet: Http) { }


  getPaginatedSubtopics(): Observable<any> {
    return this.httpGet
      .get(this.url)
      .map((response: Response) => {
        console.log(response);
        console.log(response.json());
        let subtopicArray = new Array<Subtopic>();
        for (let subtopicJson of response.json()) {
          subtopicArray.push(this._mapSubtopic(subtopicJson));
        }

        return <any>subtopicArray;
      });
  }

  updateDate(batchId, subtopicId, date): Observable<any> {
    const body = `batchId=${batchId}&subtopicId=${subtopicId}&date=${date}`;
    return this.httpPost.post<any>(this.updateDateURL, body, httpOptions);
  }

  updateStatus(batchId, subtopic: Subtopic) : Observable<any> {
    const body = `batchId=${batchId}&status=${subtopic.status}&subtopicId=${subtopic.subtopicId}`;
    return this.httpPost.post<any>(this.updateStatusURL, body, httpOptions);
  }

  /* accepts a single subtopic entity in json format to map into a
     Subtopic object */
  _mapSubtopic(subtopicJson: any): Subtopic {
    let subtopic = new Subtopic();
    subtopic.subtopicId = subtopicJson.subtopicId;
    subtopic.title = subtopicJson.subtopicName.name;
    subtopic.start = new Date(subtopicJson.subtopicDate);
    subtopic.status = subtopicJson.status.name;

    return subtopic;
  }
}
