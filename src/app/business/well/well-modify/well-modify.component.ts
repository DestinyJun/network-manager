import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-well-modify',
  templateUrl: './well-modify.component.html',
  styleUrls: ['./well-modify.component.css']
})
export class WellModifyComponent implements OnInit {
  public manholeCoverInfo: any;
  public inFlowManholelist: any;
  public flowOutManholelist: any;
  public sensorInfoList: any;
  protected isFillInWellId = true;
  protected wellId: string;
  constructor(
    private req: ReqService,
    private commonfun: CommonfunService
  ) { }

  ngOnInit() {
  }
  // 获取井ID
  public getWellId(wellId: any) {
    if (wellId.value !== '') {
      this.req.wellDetailInfo({manholeId: wellId.value}).then(value => {
        this.manholeCoverInfo = this.commonfun.judgeVarOrObjectIsValid(value['msg']['manholeCoverInfo']);
        this.inFlowManholelist = this.commonfun.judgeVarOrObjectIsValid(value['msg']['inFlowManholelist']);
        this.flowOutManholelist = this.commonfun.judgeVarOrObjectIsValid(value['msg']['flowOutManholelist']);
        this.sensorInfoList = this.commonfun.judgeVarOrObjectIsValid(value['msg']['sensorInfoList']);
        this.isFillInWellId = false;
        this.wellId = wellId.value;
      });
    }else {
      const remindMsg = '井ID不能为空';
      wellId.setAttribute('placeholder', remindMsg);
    }
  }

}
