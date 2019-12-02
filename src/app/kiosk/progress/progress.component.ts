import { Component, OnInit, Input } from '@angular/core';
import { DetailsService } from 'src/app/kiosk/displayer/DetailsService';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  location: string;
  summary: string;
  start_time: String;
  end_time: String;
  startdate: String;
  enddate: string;
  selectedRoom: Location;
  roomSelected: any;

  public Details;
  public runtime = 10000;
  //initialize the call using StudentService 
  constructor(private _myService: DetailsService) { }
  ngOnInit() {
    this.getDetails();
    this.getruntime();

  }
  // subtitleFormat callback example
  onSubmit() {
    this.selectedRoom = location;
    this.getruntime();

  }

  //method called OnInit
  getDetails() {

    this._myService.getDetails().subscribe(
      //read data and assign to public variable students
      data => {
        console.log(this.runtime);
        this.Details = data;
      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

  getruntime() {
    var Today = new Date();
    var TodayTime = Today.getTime();
    if (TodayTime == this.getTimeStamp(this.startdate)) {
      this.runtime = this.getTimeStamp(this.enddate) - this.getTimeStamp(this.startdate);
      return this.runtime;
    }
    return 0;

  }

  getTimeStamp(s) {
    return new Date(s).getTime();
  }

}

// var filteredData = [];

// for (let i = 0; i < length; i++) {
// const sdate= new Date(data[i].startdate);
// const edate= new Date(data[i].enddate)
// var MeetingstartTime = sdate.getTime();
// var MeetingendTime = edate.getTime();
// var Today = new Date();
// var TodayTime= Today.getTime();

// //Testing - Replace MeetingEndTime with TestTime in the if condition and change the value of td2 to the test value 
// if (TodayTime <= MeetingstartTime)
// { 
//   filteredData.push(data[i]);
//   this.runtime=MeetingendTime-MeetingstartTime;
//   console.log("Meeting End Time"+" "+MeetingstartTime);
//   console.log( "Today Time"+" "+TodayTime);
//   console.log("runtime"+this.runtime);
// }
// else{
//   this.runtime=0;
// }