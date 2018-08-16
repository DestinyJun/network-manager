import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';
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
      new FormHtml('进井管道长度', 'inFlowPipeLength', [[]], 'm'),
    ];
    // 出井详情
    this.outWellDetail = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('出井ID', 'flowOutRelationId', [[]], ''),
      new FormHtml('出井管道ID', 'flowOutPipeId', [[]], ''),
      new FormHtml('出井管道半径', 'flowOutPipeRadius', [[]], 'cm'),
      new FormHtml('出井管道倾斜度', 'flowOutPipeSlope', [[]], '度'),
      new FormHtml('出井管道长度', 'flowOutPipeLength', [[]], 'm'),
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
//  操作滚动条
//   public operateScroll(e): void {
//     const scrollbar = document.querySelector('.scrollbar');
//     const wellDetail = document.querySelector('#container-fluid');
//     // console.log(scrollbar); // 滚动条当前所在的位置
//     // console.log(wellDetail.scrollHeight); // 元素的总高度
//     // console.log(wellDetail.scrollTop); // 卷上去的高度
//     // console.log(wellDetail['offsetHeight']); // 当前元素在页面视图的高度
//     // console.log(parseFloat(String(scrollbar.getAttribute('style')).substring(47))); // 滚动条当前在页面视图的高度
//     // 算法：以当前元素在页面显示的视图高度为滚动条的总高度。
//     // 滚动条所在的位置 = (当前鼠标所在的位置 + 元素已卷上去的高度)/(元素的总高度) * 元素在页面显示的视图高度
//     const scrollCurrentH = ((e.clientY + wellDetail.scrollTop) / (wellDetail.scrollHeight) * wellDetail['offsetHeight']);
//     console.log(wellDetail);
//     // const scrollCurrentH = parseFloat(String(scrollbar.getAttribute('style')).substring(47));
//     // console.log(scrollbar['offsetTop']);
//     if ((wellDetail.scrollTop + scrollCurrentH) <= wellDetail.scrollHeight) {
//       console.log(111);
//       scrollbar['style'].transition =  '0.2s all';
//       scrollbar['style'].transform =  'translate(0, ' + (scrollCurrentH - 20) + 'px)';
//     }
//   }
}
