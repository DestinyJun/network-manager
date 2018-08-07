import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';
import {equal} from 'ng4-validators/src/app/equal/validator';
import {FormHtml} from '../../../shared/global.service';

@Component({
  selector: 'app-well-detail-info',
  templateUrl: './well-detail-info.component.html',
  styleUrls: ['./well-detail-info.component.css']
})
export class WellDetailInfoComponent implements OnInit {
  public manholeCoverInfo: any;
  public inFlowManholelist: any;
  public flowOutManholelist: any;
  public sensorInfoList: any;
  public isFillInWellId: boolean;
  public wellCoverDetail: Array<FormHtml>;
  public enterWellDetail: Array<FormHtml>;
  public outWellDetail: Array<FormHtml>;
  public sensorsDetail: Array<FormHtml>;
  public wellId: string;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private wellAddFormsInfo: WellAddFormsInfoService,
    private req: ReqService,
    private commonfun: CommonfunService
  ) { }

  ngOnInit() {
    // 井盖详情
    this.wellCoverDetail = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('省地区ID', 'provinceRegionId', [[]], ''),
      new FormHtml('市地区ID', 'cityRegionId', [[]], ''),
      new FormHtml('（县/区）地区ID', 'countyRegionId', [[]], ''),
      new FormHtml('（镇/乡）地区ID', 'townRegionId', [[]], ''),
      new FormHtml('传感器个数', 'sensorsize', [[]], ''),
      new FormHtml('材质', 'material', [[]], ''),
      new FormHtml('GPS对应地址', 'gpsPosition', [[]], ''),
      new FormHtml('数据收集器', 'dataCollectorId', [[]], ''),
      new FormHtml('创建时间', 'creatTime', [[]], ''),
      new FormHtml('GPSID', 'gpsId', [[]], ''),
    ];
    // 进井详情
    this.enterWellDetail = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('进井ID', 'inFlowRelationId', [[]], ''),
      new FormHtml('进井管道ID', 'inFlowPipeId', [[]], ''),
      new FormHtml('进井管道半径', 'inFlowPipeRadius', [[]], 'cm'),
      new FormHtml('进井管道倾斜度', 'inFlowPipeSlope', [[]], '度'),
      new FormHtml('进井管道长度', 'inFlowPipeLength', [[]], 'cm'),
    ];
    // 出井详情
    this.outWellDetail = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('出井ID', 'flowOutRelationId', [[]], ''),
      new FormHtml('出井管道ID', 'flowOutPipeId', [[]], ''),
      new FormHtml('出井管道半径', 'flowOutPipeRadius', [[]], 'cm'),
      new FormHtml('出井管道倾斜度', 'flowOutPipeSlope', [[]], '度'),
      new FormHtml('出井管道长度', 'flowOutPipeLength', [[]], 'cm'),
    ];
    // 传感器详情
    this.sensorsDetail = [
      new FormHtml('井ID', 'initialManholeId', [[]], ''),
      new FormHtml('传感器所属模式', 'sensormode', [[]], ''),
      new FormHtml('模块ID', 'modeId', [[]], ''),
      new FormHtml('高度', 'hight', [[]], ''),
      new FormHtml('传感器在模块中的位置', 'modePlace', [[]], ''),
      new FormHtml('导管ID', 'conduitId', [[]], ''),
      new FormHtml('数据收集器ID', 'dataCollectorId', [[]], '')
    ];
    this.isFillInWellId = true;
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
