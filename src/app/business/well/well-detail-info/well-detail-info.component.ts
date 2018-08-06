import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-well-detail-info',
  templateUrl: './well-detail-info.component.html',
  styleUrls: ['./well-detail-info.component.css']
})
export class WellDetailInfoComponent implements OnInit {
  public isFillInWellId: boolean;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private wellAddFormsInfo: WellAddFormsInfoService,
    private req: ReqService
  ) { }

  ngOnInit() {
    this.isFillInWellId = true;
  }
  // 获取井ID
  public getWellId(wellId: any) {
    if (wellId.value !== '') {
     this.req.wellDetailInfo({manholeId: wellId.value}).then(value => {
       console.log(value);
     });
    }else {
      const remindMsg = '井ID不能为空';
      wellId.setAttribute('placeholder', remindMsg);
    }
  }
}
