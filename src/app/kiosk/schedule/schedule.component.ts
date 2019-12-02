import { Component, OnInit, Input } from '@angular/core';
import { DetailsService } from './DetailsService';  


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    RoomNo = 'projectX';
     public roomSelected = []
    Room:any
    public Details;
    //initialize the call using StudentService 
    constructor(private _myService: DetailsService) { }
    ngOnInit() {
      this.getDetails();   
      //this.getdetailslist();
    }
 
    // getdetailslist()
    // { var j=0
   
    //   for(var i in this.Details){
    //     j++
    //   if (this.Details[i].location==this.Room)
    //   {
    //     this.roomSelected.push(j);
    //   }
    //   }

    // }

    getUniqueLocation(detail){
      const locations = []
      for (var i in detail){
          locations.push(detail[i].location); 
      }
      return new Set(locations)
    }

    getDetails() {
     this._myService.getDetails().subscribe(
        //read data and assign to public variable students
        data => { this.Details = this.getUniqueLocation(data);
        
        },
        err => console.error(err),
        () => console.log('finished loading')
      );
    }
  }
  
   // formatSubtitle = (percent: number) : string => {
    //   if(percent >= 100){
    //     return "Congratulations!"
    //   }else if(percent >= 50){
    //     return "Half"
    //   }else if(percent > 0){
    //     return "Just began"
    //   }else {
    //     return "Not started"
    //   }
    // }
    //method called OnInit

    // filterItems(arr, query) {
    //   return arr.filter(function(el) {
    //       return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    //   })
    // }