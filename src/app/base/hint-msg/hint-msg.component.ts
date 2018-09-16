import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hint-msg',
  templateUrl: './hint-msg.component.html',
  styleUrls: ['./hint-msg.component.css']
})
export class HintMsgComponent implements OnInit, OnChanges {
  @Input()
  protected statusConfig = {
    waiting: false,
    finish: false,
    err: false,
    msg: ''
  };

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.statusConfig);
  }


}
