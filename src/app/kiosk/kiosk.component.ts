import { Component, OnInit } from '@angular/core';
import { DetailsService } from './schedule/DetailsService';  

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {

  
  location:  string;
  summary:  string;
  start_time:  String;
  end_time: String;
  start_date:  String;

 selectedRoom: Location;
 roomSelected: any;

  public Details;

  public runtime=10000;
  //initialize the call using StudentService 
  constructor(private _myService: DetailsService) { }
  ngOnInit() {
    this.getDetails();
  }
  // subtitleFormat callback example
  onSubmit()  {
    // console.log(this.bookingModel);
    this.selectedRoom=location;
  }

  indexTracker(index: number, value: any) {
    return index;
  }
  calculateRunTime(R,T)
  {
this.runtime=R-T;
  }

  starter()
  {
    
  }
 filterItems(arr, query) {
  return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  })
}
  //method called OnInit
  getDetails() {
   this._myService.getDetails().subscribe(
      //read data and assign to public variable students
      data => { this.Details = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
}




