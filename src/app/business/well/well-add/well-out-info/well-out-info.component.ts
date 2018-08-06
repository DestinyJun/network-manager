import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormHtml, GlobalService} from '../../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellAddFormsInfoService} from '../../../../shared/well-add-forms-info.service';

@Component({
  selector: 'app-well-out-info',
  templateUrl: './well-out-info.component.html',
  styleUrls: ['./well-out-info.component.css']
})
export class WellOutInfoComponent implements OnInit, OnDestroy {
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
    private sessionStorage: GlobalService,
    private modalService: BsModalService,
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
      flowOutRelationId: ['', Validators.required],
      flowOutPipeId: ['', Validators.required],
      flowOutPipeRadius: ['', Validators.required],
      flowOutPipeSlope: ['', Validators.required],
      flowOutPipeLength: ['', Validators.required],
    };
    this.formBodyHtml = [
      // new FormHtml('井ID', 'manholeId', [[]]),
      new FormHtml('出井ID', 'flowOutRelationId', [[]]),
      new FormHtml('出井管道ID', 'flowOutPipeId', [[]]),
      new FormHtml('出井管道半径', 'flowOutPipeRadius', [[]]),
      new FormHtml('出井管道倾斜度', 'flowOutPipeSlope', [[]]),
      new FormHtml('出井管道长度', 'flowOutPipeLength', [[]]),
    ];
    // 读取缓存
    const sessionFormsValue = sessionStorage.getItem('wellOutFormsInfo');
    if (sessionFormsValue) {
      const sessionFormsValues = sessionFormsValue.split('&&,');
      const sessionFormsName = sessionStorage.getItem('wellOutFormsName').split(',');
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
        console.log(this.forms[this.forms.length - 1].valid);
        console.log(this.formValid);
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
    this.wellAddFormsInfo.cleanOutWellFormsInfo();
    this.forms.forEach(form => {
      this.wellAddFormsInfo.setOutWellFormsInfo(form.value);
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
      sessionStorage.setItem('wellOutFormsInfo', formsValue.toString());
      sessionStorage.setItem('wellOutFormsName', this.formsName.toString());
    }
  }
}
