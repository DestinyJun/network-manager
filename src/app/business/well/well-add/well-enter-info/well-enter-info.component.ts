import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormHtml, GlobalService} from '../../../../shared/global.service';

@Component({
  selector: 'app-well-enter-info',
  templateUrl: './well-enter-info.component.html',
  styleUrls: ['./well-enter-info.component.css']
})
export class WellEnterInfoComponent implements OnInit, OnDestroy {
  private formBody: any;
  public formBodyHtml: Array<FormHtml>;
  public forms: Array<FormGroup>;
  public formNum: number;
  private wellEnterFormsInfo: Array<any>;
  private formsName: Array<string>;
  constructor(
    private fb: FormBuilder,
    private sessionStorage: GlobalService
  ) {}
  ngOnInit() {
    this.forms = [];
    this.formsName = [];
    this.wellEnterFormsInfo = [];
    this.formNum = 0;
    this.formBody = {
        manholeId: [''],
        inFlowRelationId: [''],
        inFlowPipeId: [''],
        inFlowPipeRadius: [''],
        inFlowPipeSlope: [''],
        inFlowPipeLength: [''],
    };
    this.formBodyHtml = [
      new FormHtml('井ID', 'manholeId', [[]]),
      new FormHtml('进井ID', 'inFlowRelationId', [[]]),
      new FormHtml('进井管道ID', 'inFlowPipeId', [[]]),
      new FormHtml('进井管道半径', 'inFlowPipeRadius', [[]]),
      new FormHtml('进井管道倾斜度', 'inFlowPipeSlope', [[]]),
      new FormHtml('进井管道长度', 'inFlowPipeLength', [[]]),
    ];
    // 读取缓存
    const sessionFormsValue = sessionStorage.getItem('wellEnterFormsValue');
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
  public addForm(): void {
    this.formNum++;
    this['form' + this.formNum] = this.fb.group(this.formBody);
    this.formsName.push('form' + this.formNum);
    this.forms.push(this['form' + this.formNum]);
  }
  // 删除表
  public deleteForm(form): void {
    this.forms.splice(this.forms.indexOf(form), 1);
  }
  // 最后保存所有表单信息
  public submitAllFormInfo(): void {
    this.forms.forEach((form) => {
      this.wellEnterFormsInfo.push(form);
    });
  }
  // 在组件路由当其他组件后所有表单保存数据 和 表单名
  ngOnDestroy(): void {
    const formsValue = [];
    if (this.forms !== []) {
      this.forms.map((form, index) => {
        if (index === (this.forms.length - 1)) {
          formsValue.push(JSON.stringify(form.value));
        }else {
          formsValue.push(JSON.stringify(form.value) + '&&');
        }
      });
      sessionStorage.setItem('wellEnterFormsValue', formsValue.toString());
      sessionStorage.setItem('wellEnterFormsName', this.formsName.toString());
    }
  }
}
