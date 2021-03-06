import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule }  from 'primeng/inputtext';
import { ButtonModule }  from 'primeng/button';
import { TableModule }  from 'primeng/table';
import { DialogModule }  from 'primeng/dialog';
import { AppComponent } from './app.component';
import { BurndownComponent } from './burndown/burndown.component';
import {ChartModule, GrowlModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/schedule';
import { CalendarComponent } from './calendar/calendar.component'

@NgModule({
    declarations: [
        AppComponent,
        BurndownComponent,
        CalendarComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        ChartModule,
        GrowlModule,
        ScheduleModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
