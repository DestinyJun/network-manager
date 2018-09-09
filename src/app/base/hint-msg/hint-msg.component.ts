import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hint-msg',
  templateUrl: './hint-msg.component.html',
  styleUrls: ['./hint-msg.component.css']
})
export class HintMsgComponent implements OnInit, OnChanges {
  @Input()
  public waiting = false;
  @Input()
  public finish = false;
  @Input()
  public err = false;
  @Input()
  public msg = '';

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.waiting);
    console.log(this.finish);
    console.log(this.err);
    console.log(this.msg);
    // console.log('waiting：' + changes['waiting'].previousValue);
    // console.log('waiting：' + changes['waiting'].currentValue);
    // console.log('waiting：' + changes['waiting'].firstChange);
    // console.log('finish：' + changes['finish'].previousValue);
    // console.log('finish：' + changes['finish'].currentValue);
    // console.log('finish：' + changes['finish'].firstChange);
  }


}
