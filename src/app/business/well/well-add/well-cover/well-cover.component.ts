import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {FormHtml, GlobalService} from '../../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonfunService} from '../../../../shared/commonfun.service';
import {WellAddFormsInfoService} from '../../../../shared/well-add-forms-info.service';

@Component({
  selector: 'app-well-cover',
  templateUrl: './well-cover.component.html',
  styleUrls: ['./well-cover.component.css']
})
export class WellCoverComponent implements OnInit, OnDestroy {
  private wellFormBody: any;
  public wellFormBodyHtml: Array<FormHtml>;
  public wellCoverForm: FormGroup;
  public formNum: number;
  constructor(
    private fb: FormBuilder,
    private sessionStorage: GlobalService,
    private modalService: BsModalService,
    private commonfun: CommonfunService,
    private wellAddFormsInfo: WellAddFormsInfoService
  ) {}
  ngOnInit() {
    this.formNum = 0;
    this.wellFormBody = {
      manholeId: [{value: sessionStorage.getItem('wellId')}, Validators.required],
      provinceRegionId: ['', Validators.required],
      cityRegionId: ['', Validators.required],
      countyRegionId: ['', Validators.required],
      townRegionId: ['', Validators.required],
      sensorsize: ['', Validators.required],
      material: ['', Validators.required],
      gpsPosition: ['', Validators.required],
      dataCollectorId: ['', Validators.required],
      creatTime: ['', Validators.required],
      gpsId: ['', Validators.required],
    };
    this.wellFormBodyHtml = [
      // new FormHtml('井ID', 'manholeId', [[]], ''),
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
    this.wellCoverForm = this.fb.group(this.wellFormBody);
    // 读取缓存
    const sessionFormsValue = sessionStorage.getItem('wellCoverFormsValue');
    if (sessionFormsValue) {
      this.wellCoverForm.reset(JSON.parse(sessionFormsValue));
    }
  }
  // 保存全部数据
  public save(): void {
    this.wellAddFormsInfo.cleanWellCoverFormsInfo();
    this.wellAddFormsInfo.setWellCoverFormsInfo(this.wellCoverForm.value);
  }
  // 在组件路由当其他组件后所有表单保存数据 和 表单名
  ngOnDestroy(): void {
      // 保存井盖的基本信息
      sessionStorage.setItem('wellCoverFormsValue', JSON.stringify(this.wellCoverForm.value));
  }
}
