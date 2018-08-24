import {Component, OnInit} from '@angular/core';
import {ManholeCoverInfo, UsePageQueryWell} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-well-information',
  templateUrl: './well-information.component.html',
  styleUrls: ['./well-information.component.css']
})
export class WellInformationComponent implements OnInit {
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
    // 初始化表格
    this.usePageQuery();
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody.currentPage = event['page'];
    this.usePageQuery();
  }
  // 获取地区id. 按地区筛选数据
  public getRegionInfo(e): void {
    this.pageBody.provinceRegionId = e.provinceRegionId;
    this.pageBody.cityRegionId = e.cityRegionId;
    this.pageBody.countyRegionId = e.countyRegionId;
    this.pageBody.townRegionId = e.townRegionId;
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
  // 按页查询选请求
  public usePageQuery(): void {
    this.req.pagingWell(this.pageBody).then(value => {
      this.datas = value.paingmsg.datas;
      this.resDatas = value;
    });
  }

}
