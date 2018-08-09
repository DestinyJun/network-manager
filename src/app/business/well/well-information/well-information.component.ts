import {Component, OnInit} from '@angular/core';
import {ManholeCoverInfo, UsePageQueryWell} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-well-information',
  templateUrl: './well-information.component.html',
  styleUrls: ['./well-information.component.css']
})
export class WellInformationComponent implements OnInit {
  // 用于表单显示的数据的格式
  // private fields: Array<FormHtml>;
  // pageBody 当前查看页发送请求的信息
  private pageBody: UsePageQueryWell;
  // resDatas 用来接收查看请求返回的数据
  public resDatas: any;
  // datas 用于页面表格中显示的数据
  public datas: Array<ManholeCoverInfo>;
  // hasChecked 用于记录已勾选的表格
  private hasChecked: Array<ManholeCoverInfo>;
  constructor(
    public req: ReqService
  ) { }

  ngOnInit() {
    this.hasChecked = [];
    this.pageBody = new UsePageQueryWell(1, 10, '', '', '', '');
    // this.fields = [
    //       new  FormHtml('井ID', 'id', [[]]),
    //       new  FormHtml('井盖ID', 'manholeId', [[]]),
    //       new  FormHtml('传感器个数', 'sensorsize', [[]]),
    //       new  FormHtml('材质', 'material', [[]]),
    //       new  FormHtml('地址', 'gpsPosition', [[]]),
    //       new  FormHtml('数据收集器id', 'dataCollectorId', [[]]),
    //       new  FormHtml('创建时间', 'creatTime', [[]]),
    //       new  FormHtml('gps坐标', 'gpsId', [[]]),
    //       new  FormHtml('省地区Id', 'provinceRegionId', [[]]),
    //       new  FormHtml('市地区Id', 'cityRegionId', [[]]),
    //       new  FormHtml('县地区Id', 'countyRegionId', [[]]),
    //       new  FormHtml('镇地区Id', 'townRegionId', [[]])
    // ];
    // 初始化表格
    this.usePageQuery();
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.usePageQuery();
  }
  // 全选
  public checkAll(): void {
    const checks = document.querySelectorAll('input[type=\'checkbox\']');
    for (let i = 0; i < checks.length; i++) {
      if (checks[0]['checked'] === true) {
        checks[i]['checked'] = true;
        this.datas.forEach(value => {
          this.hasChecked.push(value);
        });
      }else {
        checks[i]['checked'] = false;
        this.hasChecked = [];
      }
    }
  }
  // 勾选
  public check(data: ManholeCoverInfo, e: Event): void {
    // console.log(e);
    if (e.srcElement['checked'] === true) {
      this.hasChecked.push(data);
    }else {
      document.querySelector('input[type=\'checkbox\']')['checked'] = false;
      this.hasChecked.splice(this.datas.indexOf(data), 1);
    }
  }
  // 删除已选中的
  public delete(): void {
    this.hasChecked.forEach(value => {
      // this.req.deleteWell({manholeId: value.manholeId}).then(res => {
      //   console.log(res);
      //     const checks = document.querySelectorAll('input[type=\'checkbox\']');
      //     for (let i = 0; i < checks.length; i++) {
      //       checks[i]['checked'] = false;
      //     }
      //     this.hasChecked = [];
      // });
    });
  }
  // 按页差选请求
  public usePageQuery(): void {
    this.req.pagingWell(this.pageBody).then(value => {
      console.log(value);
      this.datas = value.paingmsg.datas;
      this.resDatas = value;
    });
  }
}
