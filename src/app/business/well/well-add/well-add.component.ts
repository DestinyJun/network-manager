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
  public changeBgColor(child, parent): void {
    for (let i = 0; i < parent.children.length; ++i) {
      if (parent.children[i].children[0] === child.target) {
        child.target.style.backgroundColor = '#37606C';
      }else {
        parent.children[i].children[0].style.backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
  }

}
