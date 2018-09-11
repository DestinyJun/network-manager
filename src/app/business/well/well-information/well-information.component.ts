import {Component, OnInit} from '@angular/core';
import {ManholeCoverInfo, UsePageQueryWell} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  // 控制当前的操作框
  protected controlHintBox = true;
  // 记录当前要操作的ID
  private manholeId: string;

  constructor(
    public req: ReqService,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) {
  }

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
    setTimeout(() => {
      this.usePageQuery();
    }, 300);
  }

  // 打开井的进行操作弹出框
  public openHintBox(e, id): void {
    const hintBox = document.querySelector('.hintBox');
    hintBox['style'].top = e.clientY + 'px';
    this.controlHintBox = true;
    setTimeout(() => {
      this.controlHintBox = false;
      this.manholeId = id;
    }, 100);
  }

  // 选择操作
  public oprate(item: string, id): void {
    const queryParams = {
      queryParams: {
        id: this.manholeId,
        parentUrl: this.routerInfo.parent['_routerState'].snapshot.url
      }
    };
    if (item === 'modify') {
      this.router.navigate(['home/well/wellmodify'], queryParams);
    } else if (item === 'delete') {
      this.router.navigate(['home/well/welldelete'], queryParams);
    } else {
      this.router.navigate(['home/well/wellDetailInfo'], queryParams);
    }
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
      } else {
        checks[i]['checked'] = false;
        this.hasChecked = [];
      }
    }
  }

  // 勾选
  public check(data: ManholeCoverInfo, e: Event): void {
    // 取消冒泡行为
    e.stopImmediatePropagation();
    if (e.srcElement['checked'] === true) {
      this.hasChecked.push(data);
    } else {
      document.querySelector('input[type=\'checkbox\']')['checked'] = false;
      this.hasChecked.splice(this.datas.indexOf(data), 1);
    }
  }

  // 删除已选中的
  public delete(): void {
    this.hasChecked.forEach(value => {
      this.req.deleteWell({manholeId: value.manholeId}).then(res => {
        console.log(res);
        const checks = document.querySelectorAll('input[type=\'checkbox\']');
        for (let i = 0; i < checks.length; i++) {
          checks[i]['checked'] = false;
        }
        this.hasChecked = [];
      });
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
