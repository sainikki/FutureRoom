import { Component, OnInit, Input } from '@angular/core';
// import { Booking } from '../booking';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../event.service'



@Component({
  selector: 'app-confroom',
  templateUrl: './confroom.component.html',
  styleUrls: ['./confroom.component.css'],
})

export class ConfroomComponent implements OnInit {
  // bookingModel = new Booking(9, 28, 2020, 11, 15, "AM", 11, 30, "PM", 100, "room_c");
  @Input() location;
  @Input() date;
  @Input() start_time;
  @Input() end_time;
  @Input() no_attendees;
  public text;
  public recommendation;
  public input;
  dataSource;
  events;
  displayedColumns: string[] = ['room', 'capacity'];


  onSubmit() {
    // console.log(this.bookingModel);
    this.myFunction();
  }
  constructor(private httpClient: HttpClient, private _myService: EventService) {
  }

  ngOnInit() {
    this.getEvents()
  }

  getEvents() {
    this._myService.getevent().subscribe(
      //read data and assign to public variable students
      data => { this.events = this.getUniqueLocation(data)},
      err => console.error(err),
      () => console.log ('Locations fetched')
    );
  }

  getUniqueLocation(event){
      const locations = []
      for (var i in event){
          locations.push(event[i].location);
      }
      return new Set(locations)
    }


  myFunction2(arg) {
    // var arg = { 'text': 'The room is available at the requested time.', 'recommendation': [{ 'room': 'Room A', 'capacity': 10 }, { 'room': 'Room B', 'capacity': 20 }, { 'room': 'Room C', 'capacity': 30 }] };
    this.text = arg.text;
    this.dataSource = arg.recommendation;
    // alert(arg)
  }

  myFunction() {
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var this_month = months[this.date.getMonth()]
    var month = this.date.getFullYear() + "-" + this_month + "-" + this.date.getDate()
    this.input = [month, this.start_time, this.end_time, this.location, this.no_attendees];
    this.httpClient.post('http://localhost:5000/result', { 'text': this.input }).subscribe((responseData) => {
      this.myFunction2(responseData);
    });
  }

}
