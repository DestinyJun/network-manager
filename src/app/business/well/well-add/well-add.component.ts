import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-well-add',
  templateUrl: './well-add.component.html',
  styleUrls: ['./well-add.component.css']
})
export class WellAddComponent implements OnInit, AfterViewInit {
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
  constructor(
    private routerInfo: ActivatedRoute
  ) {}

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const bb = document.getElementsByClassName('active')[0].parentElement.children;
    const currentRoute = this.routerInfo.firstChild.url['_value'][0].path;
    for (let i = 0; i < bb.length; i++) {
      console.log(bb[i]);
      if (bb[i].children[0].getAttribute('href').indexOf(currentRoute) !== -1) {
        bb[i].children[0]['style'].backgroundColor = '#37606C';
      }else {
        bb[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
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

  // 最后保存所有表单信息
  public submitAllFormInfo(): void {

  }

}
