import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import * as $ from "jquery";

@Component({
  selector: 'app-well-add',
  templateUrl: './well-add.component.html',
  styleUrls: ['./well-add.component.css']
})
export class WellAddComponent implements OnInit, AfterViewInit, OnDestroy {
  public wellID: string;
  public isFillInWellId: boolean;
  public wellInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private wellAddFormsInfo: WellAddFormsInfoService,
    private req: ReqService
  ) {}

  ngOnInit() {
    this.wellID = sessionStorage.getItem('wellId') || null;
    // 如果 isFillInWellId 不为空，则知道是在当前模块刷新。否则是从其他模块路由过来的。
    const isFillInWellId = sessionStorage.getItem('isFillInWellId');
    if (isFillInWellId) {
      this.isFillInWellId = false;
    }else {
      this.isFillInWellId = true;
    }
  }
  ngAfterViewInit(): void {
    if (this.routerInfo.firstChild) {
      const url = this.routerInfo.firstChild.url['_value'];
      const bb = document.getElementsByClassName('active')[0].parentElement.children;
      if (url.length !== 0) {
        // 这里主要是拿到url刷新后的子路由
        const currentRoute = url[0].path;
        for (let i = 0; i < bb.length; i++) {
          const href = bb[i].children[0].getAttribute('href');
          if (href && href.indexOf(currentRoute) !== -1) {
            bb[i].children[0]['style'].backgroundColor = '#37606C';
          }else {
            bb[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
          }
        }
      }
    }
  }
  public changeBgColor(child, parent): void {
    for (let i = 0; i < parent.children.length; ++i) {
      if (parent.children[i].children[0] === child.target) {
        child.target.style.backgroundColor = '#37606C';
      }else {
        parent.children[i].children[0].style.backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
  }

  // 获取井ID
  public getWellId(wellId: any) {
    if (wellId.value !== '') {
      this.isFillInWellId = false;
      sessionStorage.setItem('wellId', wellId.value);
      this.wellID = wellId.value;
      sessionStorage.setItem('isFillInWellId', 'true');
      this.router.navigate(['home/well/welladd/cover']);
    }else {
      const remindMsg = '井ID不能为空';
      wellId.setAttribute('placeholder', remindMsg);
    }
  }

  // 最后保存所有表单信息
  public submitAllFormInfo(): void {
    // console.log(this.wellAddFormsInfo.getWellAllInfo());
    $.ajax({
      url: 'http://192.168.28.151:8082/pipe-network-Manager/insertWell',
      type: 'POST',
      async: false,
      cache: false,
      data: this.wellAddFormsInfo.getWellAllInfo(),
      headers: {
        'accessToken': sessionStorage.getItem('token')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    });


    // 获取井盖信息
    const wellCoverInfo = sessionStorage.getItem('wellCoverFormsInfo');
    this.wellInfo.manholeCoverInfo = wellCoverInfo;

    // 获取进井信息
    const wellEnterInfo = sessionStorage.getItem('wellEnterFormsInfo');
    this.wellInfo.inFlowManholelist.push(wellEnterInfo);

    // 获取出井信息
    const wellOutInfo = sessionStorage.getItem('wellOutFormsInfo');
    this.wellInfo.flowOutManholelist.push(wellOutInfo);

    // 获取传感器信息
    const wellSensorsInfo = sessionStorage.getItem('wellSensorFormsInfo');
    this.wellInfo.sensorInfoList.push(wellSensorsInfo);
      console.log('提交表的信息');
  }

  ngOnDestroy(): void {
    this.isFillInWellId = true;
    // 当离开当前模块的时候，清除当前模块的所有缓存数据。
    sessionStorage.removeItem('isFillInWellId');
    sessionStorage.removeItem('wellCoverFormsInfo');
    sessionStorage.removeItem('wellEnterFormsInfo');
    sessionStorage.removeItem('wellOutFormsInfo');
    sessionStorage.removeItem('wellSensorFormsInfo');
  }

}
