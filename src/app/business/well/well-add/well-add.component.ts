import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-well-add',
  templateUrl: './well-add.component.html',
  styleUrls: ['./well-add.component.css']
})
export class WellAddComponent implements OnInit {
  private wellCoverInfo: any;
  private wellEnterInfo: any;
  private wellOutInfo: any;
  private wellSensor: any;
  public wellInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  constructor() {}

  ngOnInit() {
  }

}
