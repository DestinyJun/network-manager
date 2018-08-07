import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormHtml, GlobalService} from '../../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CommonfunService} from '../../../../shared/commonfun.service';
import {WellAddFormsInfoService} from '../../../../shared/well-add-forms-info.service';

@Component({
  selector: 'app-well-enter-info',
  templateUrl: './well-enter-info.component.html',
  styleUrls: ['./well-enter-info.component.css']
})
export class WellEnterInfoComponent implements OnInit, OnDestroy {
  public modalRef: BsModalRef;
  private formBody: any;
  public formBodyHtml: Array<FormHtml>;
  public forms: Array<FormGroup>;
  public formNum: number;
  private wellEnterFormsInfo: Array<any>;
  private formsName: Array<string>;
  public formValid: boolean;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private commonfun: CommonfunService,
    private wellAddFormsInfo: WellAddFormsInfoService
  ) {}
  ngOnInit() {
    this.forms = [];
    this.formsName = [];
    this.wellEnterFormsInfo = [];
    this.formNum = 0;
    this.formValid = true;
    this.formBody = {
        manholeId: [{value: sessionStorage.getItem('wellId')}, Validators.required],
        inFlowRelationId: ['', Validators.required],
        inFlowPipeId: ['', Validators.required],
        inFlowPipeRadius: ['', Validators.required],
        inFlowPipeSlope: ['', Validators.required],
        inFlowPipeLength: ['', Validators.required],
    };
    this.formBodyHtml = [
      // new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('进井ID', 'inFlowRelationId', [[]], ''),
      new FormHtml('进井管道ID', 'inFlowPipeId', [[]], ''),
      new FormHtml('进井管道半径', 'inFlowPipeRadius', [[]], ''),
      new FormHtml('进井管道倾斜度', 'inFlowPipeSlope', [[]], ''),
      new FormHtml('进井管道长度', 'inFlowPipeLength', [[]], ''),
    ];
    // 读取缓存
    const sessionFormsValue = sessionStorage.getItem('wellEnterFormsInfo');
    if (sessionFormsValue) {
      const sessionFormsValues = sessionFormsValue.split('&&,');
      const sessionFormsName = sessionStorage.getItem('wellEnterFormsName').split(',');
      sessionFormsValues.map((value, index) => {
        this[sessionFormsName[index]] = this.fb.group(this.formBody);
        this[sessionFormsName[index]].patchValue(JSON.parse(value));
        this.forms.push(this[sessionFormsName[index]]);
      });
    }
  }
  // 增加表
  public addForm(template: TemplateRef<any>): void {
    // 当还没有添加表单时，可以添加第一个表单。当要添加下一个表单时，会校验上一个表单是否合法，如果合法，则可以添加，否则添加失败
    if (this.formValid && this.forms.length === 0) {
      this.formNum++;
      this['form' + this.formNum] = this.fb.group(this.formBody);
      this.formsName.push('form' + this.formNum);
      this.forms.push(this['form' + this.formNum]);
      this.formValid = false;
    }else {
      if (this.forms[this.forms.length - 1].valid) {
        this.formNum++;
        this['form' + this.formNum] = this.fb.group(this.formBody);
        this.formsName.push('form' + this.formNum);
        this.forms.push(this['form' + this.formNum]);
        this.formValid = false;
      }else {
        this.modalRef = this.modalService.show(template);
        this.formValid = false;
      }
    }
  }
  // 删除表
  public deleteForm(form): void {
    this.forms.splice(this.forms.indexOf(form), 1);
    if (this.forms.length === 0) {
      this.formValid = true;
    }
  }
  // 删除所有表单
  public cleanAllForm(): void {
    if (this.forms.length !== 0) {
      if (confirm('你确定清除所有数据?')) {
        this.forms = [];
      }
    }
  }
  // 保存全部数据
  public save(): void {
    this.wellAddFormsInfo.cleanEnterWellFormsInfo();
    this.forms.forEach(form => {
      this.wellAddFormsInfo.setEnterWellFormsInfo(form.value);
    });
  }
  // 在组件路由当其他组件后所有表单保存数据 和 表单名
  ngOnDestroy(): void {
    // this.forms.forEach((value) => {
    //   if (value.valid) {
    //     this.wellAddFormsInfo.setEnterWellFormsInfo(value.value);
    //   }else {
    //     this.wellAddFormsInfo.setValidCurrentFormValue(false);
    //   }
    // });
    const formsValue = [];
    if (this.forms !== []) {
      this.forms.map((form, index) => {
        if (index === (this.forms.length - 1)) {
          formsValue.push(JSON.stringify(form.value));
        }else {
          formsValue.push(JSON.stringify(form.value) + '&&');
        }
      });
      sessionStorage.setItem('wellEnterFormsInfo', formsValue.toString());
      sessionStorage.setItem('wellEnterFormsName', this.formsName.toString());
    }
  }
}
