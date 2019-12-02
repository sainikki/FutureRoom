import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `{{ now }}`,
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  public now: Date = new Date();
  ngOnInit() {
  }
  constructor() {
      setInterval(() => {
        this.now = new Date();
      }, 1);
  }
}






   

