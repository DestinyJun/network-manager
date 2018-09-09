import { Component, OnInit } from '@angular/core';
import {ReqService} from '../../../shared/req.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-well-delete',
  templateUrl: './well-delete.component.html',
  styleUrls: ['./well-delete.component.css']
})
export class WellDeleteComponent implements OnInit {
  // 操作后的状态
  public status = {
    waiting: false,
    finish: false,
    err: false,
    msg: ''
  };
  protected backUrl: string;
  protected controlBackBtn = true;
  public wellId: string;
  constructor(
    private req: ReqService,
    private routerInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((data) => {
      if (data.id) {
        this.wellId = data.id;
        this.backUrl = data.parentUrl;
        this.controlBackBtn = false;
      }
    });
  }
  public delete(id: string): void {
    this.status.waiting = true;
    this.status.finish = true;
    this.req.deleteWell({manholeId: this.wellId}).then(value => {
      this.status.waiting = false;
      // 10:删除成功
      // 11:删除失败
      console.log(value);
      if (Number(value.state) === 10) {
        this.status.msg = '';
        this.status.finish = true;
        setTimeout(() => {
          this.status.finish = false;
        }, 1000);
      }else if (Number(value.state) === 11) {
        this.status.msg = '删除失败';
      }else {
        this.status.msg = '未知错误';
      }
    });
  }

}
