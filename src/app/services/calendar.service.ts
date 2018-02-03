import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class CalendarService {

  url = `http://localhost:9001/api/v1/calendar/subtopicspagination?batchId=22506&pageSize=34&pageNumber=0`;
  updateDateURL = `http://localhost:9001/api/v1/calendar/dateupdate`;


  constructor(private httpPost: HttpClient, private httpGet: Http) { }


  getPaginatedSubtopics(): Observable<any> {
    return this.httpGet
        .get(this.url)
        .map( (response: Response) => {
          return <any> response;
        });
  }

  updateDate(batchId, subtopicId, date): Observable<any> {
    const body = `batchId=${batchId}&subtopicId=${subtopicId}&date=${date}`;
    return this.httpPost.post<any>(this.updateDateURL, body, httpOptions);
  }


}
