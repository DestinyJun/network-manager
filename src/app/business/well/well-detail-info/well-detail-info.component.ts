import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';
import {TextBox} from '../../../shared/global.service';

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
  public wellCoverDetail: Array<TextBox>;
  public enterWellDetail: Array<TextBox>;
  public outWellDetail: Array<TextBox>;
  public sensorsDetail: Array<TextBox>;
  public wellId: string;
  // 控制返回按钮
  protected controlBackBtn = true;
  // 保存返回的url
  protected backUrl: string;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private req: ReqService,
    private commonfun: CommonfunService
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((data) => {
      if (data.id) {
        this.backUrl = data.parentUrl;
        this.getWellId(data.id);
        this.isFillInWellId = false;
        this.controlBackBtn = false;
      }
    });
    // 井盖详情
    this.wellCoverDetail = [
      new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('省地区ID', 'provinceRegionId', [[]], 'text', '', ''),
      new TextBox('市地区ID', 'cityRegionId', [[]], 'text', '', ''),
      new TextBox('（县/区）地区ID', 'countyRegionId', [[]], 'text', '', ''),
      new TextBox('（镇/乡）地区ID', 'townRegionId', [[]], 'text', '', ''),
      new TextBox('传感器个数', 'sensorsize', [[]], 'text', '', ''),
      new TextBox('材质', 'material', [[]], 'text', '', ''),
      new TextBox('GPS对应地址', 'gpsPosition', [[]], 'text', '', ''),
      new TextBox('数据收集器', 'dataCollectorId', [[]], 'text', '', ''),
      new TextBox('创建时间', 'creatTime', [[]], 'text', '', ''),
      new TextBox('GPSID', 'gpsId', [[]], 'text', '', ''),
      new TextBox('进井个数', 'inFlowManholeNum', [[]], 'text', '', ''),
      new TextBox('出井个数', 'flowOutManholeNum', [[]], 'text', '', ''),
      new TextBox('井高度', 'high', [[]], 'text', '', ''),
    ];
    // 进井详情
    this.enterWellDetail = [
      new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('进井ID', 'inFlowRelationId', [[]], 'text', '', ''),
      new TextBox('进井管道ID', 'inFlowPipeId', [[]], 'text', '', ''),
      new TextBox('进井管道半径', 'inFlowPipeRadius', [[]], 'text', '', 'cm'),
      new TextBox('进井管道倾斜度', 'inFlowPipeSlope', [[]], 'text', '', '度'),
      new TextBox('进井管道长度', 'inFlowPipeLength', [[]], 'text', '', 'm'),
      new TextBox('模块ID', 'modeId', [[]], 'text', '', ''),
    ];
    // 出井详情
    this.outWellDetail = [
      new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('出井ID', 'flowOutRelationId', [[]], 'text', '', ''),
      new TextBox('出井管道ID', 'flowOutPipeId', [[]], 'text', '', ''),
      new TextBox('出井管道半径', 'flowOutPipeRadius', [[]], 'text', '', 'cm'),
      new TextBox('出井管道倾斜度', 'flowOutPipeSlope', [[]], 'text', '', '度'),
      new TextBox('出井管道长度', 'flowOutPipeLength', [[]], 'text', '', 'm'),
      new TextBox('模块ID', 'modeId', [[]], 'text', '', ''),
    ];
    // 传感器详情
    this.sensorsDetail = [
      new TextBox('井ID', 'initialManholeId', [[]], 'text', '', ''),
      new TextBox('传感器所属模式', 'sensormode', [[]], 'text', '', ''),
      new TextBox('模块ID', 'modeId', [[]], 'text', '', ''),
      new TextBox('高度', 'hight', [[]], 'text', '', ''),
      new TextBox('传感器在模块中的位置', 'modePlace', [[]], 'text', '', ''),
      new TextBox('导管ID', 'conduitId', [[]], 'text', '', ''),
      new TextBox('数据收集器ID', 'dataCollectorId', [[]], 'text', '', '')
    ];
    this.isFillInWellId = true;
  }
  // 获取井ID
  public getWellId(wellId: any) {
    if (wellId.value !== '') {
     this.req.wellDetailInfo({manholeId: wellId}).then(value => {
       console.log(value);
       this.manholeCoverInfo = this.commonfun.judgeVarOrObjectIsValid(value['msg']['manholeCoverInfo']);
       this.inFlowManholelist = this.commonfun.judgeVarOrObjectIsValid(value['msg']['inFlowManholelist']);
       this.flowOutManholelist = this.commonfun.judgeVarOrObjectIsValid(value['msg']['flowOutManholelist']);
       this.sensorInfoList = this.commonfun.judgeVarOrObjectIsValid(value['msg']['sensorInfoList']);
       this.isFillInWellId = false;
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
  // 返回上一层按钮控制
  public previousLayer(): void {
      if (this.backUrl) {
        this.router.navigate([this.backUrl]);
      }else {
        this.isFillInWellId = !this.isFillInWellId;
      }
  }
  // 具体查看井的某个模块信息
  public childDetail(detail): void {
    const ele = document.getElementById(detail.value);
    if (detail.value === '-1') {
      const well = document.querySelector('.wellDetail');
      for (let i = 1; i < well.children[0].children.length; i++) {
        well.children[0].children[i]['style'].display = 'block';
      }
    } else {
      if (ele) {
        for (let i = 1; i < ele.parentNode['children'].length; i++) {
          if (ele.parentNode['children'][i] === ele) {
            ele.style.display = 'block';
          }else {
            ele.parentNode['children'][i]['style'].display = 'none';
          }
        }
      }
    }

  }
}
