import { Component, OnInit, ViewChild } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {Messages, Message, UIChart} from 'primeng/primeng'; // REMEMBER THIS
import {OverlayPanelModule, OverlayPanel} from 'primeng/overlaypanel';
//import {MenuItem} from 'primeng/api';                   //api David Graves
import { BurndownService } from '../services/burndown.service';

import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css'],
})
export class BurndownComponent implements OnInit{
    @ViewChild("chart") chart: UIChart;
    data: any;
    options: any;

    counter: number = 0;
    msgs: Message[];

    startDate: Date;
    dateArr: Date[] = [];

    dates: string[] = ["1 21","1/22","1/23","1/24","1/25","1/26","1/27","1/28"];
    //pointsRem: number[] = [7,6,10,7,8,3,1,0];
    pointsRem: number[] = [7,6,NaN,7,8,3,1,0];
    constructor() {
        this.startDate = new Date(Date.now());
        this.data = {
            labels: ["1/21","1/22","1/23","1/24","1/25","1/26","1/27"],
            datasets: [
                {
                    label: 'Ideal',
                    data: [120,100,80,60,40,20,0],
                    fill: true,
                    borderColor: '#f97d16',
                    backgroundColor: '#f97d16',
                    //borderWidth: 5,
                     pointBackgroundColor: 'black',
                     pointStyle: 'rect',
                     //pointBorderColor: "black",
                     pointRadius: 5,
                     //pointBorderWidth: 3,
                     //showLine: true,
                     steppedLine: true,
                     //lineTension: 2,
                     
                },
                {
                    label: 'Actual',
                    data: [120,140,null,160,60,40,0],
                    fill: true,
                    borderColor: '#ec5300',
                    backgroundColor: '#ec5300',
                    
                     pointBackgroundColor: 'black',
                     pointStyle: 'rect',
                     //pointBorderColor: "black",
                     pointRadius: 5,
                     //pointBorderWidth: 3,
                    //showLine: true,
                    steppedLine: true,
                    spanGaps: true
                }


            ]
        }
        this.options = {
            title: {
                display: true,
                text: 'Burndown for week ' + "1/21/2018" + " - " + "1/27/2018",
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
            
        };
    }

    ngOnInit()
    {
        this.chart.data = this.data
        this.chart.options = this.options;
        this.chart.width = "700px";
        //this.chart.height = "500px";
        
        //console.log(this.chart.data.datasets[0].data);
        //console.log(this.chart.options);
        //console.log(this.chart._data);
        //console.log(this.chart.height);
        //this.chart.data.datasets[0].data = [10,20];
        //this.chart.refresh;
        
        let nextDate = this.startDate;
        this.dateArr.push(nextDate);

        let str = nextDate.toDateString();
        console.log(str.substr(4,7));

        for(let i = 1; i < 7; i++)
        {
            nextDate = new Date(nextDate.getTime() + (1000 * 60 * 60 * 24));
            this.dateArr.push(nextDate);
            
            let str = nextDate.toDateString();
            console.log(str.substr(4,7));
            
        }
        console.log(this.dateArr);

        
        

    }
  selectData(event) {
      console.log(event);
    //event.dataset = Selected dataset;
    //console.log(event.datasets);
    //event.element = Selected element
    //console.log(event.element);
    //event.element._datasetIndex = Index of the dataset in data
    //console.log(this.data.datasets[event.element._datasetIndex]);
    //event.element._index = Index of the data in dataset
    //console.log(event.element._index);
   
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    
    
    
}
update(event) {
     let random = Math.floor((Math.random() * 100) + 1);
     let str = "abcdefghijklmnopqrstuvwxyz"
     this.chart.data.datasets[1].data.push(random);
    //this.chart.data.datasets[0].data[0] = random;

     this.chart.data.datasets[1].data.map(
        (x:number, index:number) =>
        {
            let random = Math.floor((Math.random() * 100) + 1);
            this.chart.data.datasets[1].data[index] = random;
        }

     );
     //this.chart.data.labels.push(str.charAt(random));

    //  this.chart.data.datasets[0].data.push(this.pointsRem[this.counter]);
    //  this.chart.data.labels.push(this.dates[this.counter]);

    // console.log(this.chart.data.datasets[0].data);
     this.chart.refresh();
    // this.counter += 1;

    this.pointsRem.map(
        (x: number, index: number) => {
            this.chart.data.datasets[0].data.push(x);
            this.chart.data.labels.push(this.dates[index]);
            this.chart.refresh();
          }
    );


    
}





}


