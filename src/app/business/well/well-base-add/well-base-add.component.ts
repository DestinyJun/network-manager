import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormHtml, GlobalService} from '../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CommonfunService} from '../../../shared/commonfun.service';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-well-base-add',
  templateUrl: './well-base-add.component.html',
  styleUrls: ['./well-base-add.component.css']
})
export class WellBaseAddComponent implements OnInit {
  // 首先规定提交井的信息格式
  public wellBaseInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    manholeMode: ''
  };
  public wellID: FormControl = new FormControl(); // 要实例化才能使用
  public modalRef: BsModalRef;
  public formValid = true;
  public allFormsValid = false;
  public validRegion = false;
  // 井盖的
  private wellCoverFormsBody: any;
  public wellCoverFormBodyHtml: Array<FormHtml> = [];
  public wellCoverForm: FormGroup;
  // 进井
  private enterFormsBody: any;
  public enterFormBodyHtml: Array<FormHtml> = [];
  public enterForms: Array<FormGroup> = [];
  // 出井
  private outFormsBody: any;
  public outFormBodyHtml: Array<FormHtml> = [];
  public outForms: Array<FormGroup> = [];
  constructor(
    private fb: FormBuilder,
    private sessionStorage: GlobalService,
    private modalService: BsModalService,
    private commonfun: CommonfunService,
    private wellAddFormsInfo: WellAddFormsInfoService,
    private req: ReqService
  ) { }

  ngOnInit() {
    // 井盖的
    this.wellCoverFormsBody = {
      manholeId: ['', Validators.required],
      provinceRegionId: [''],
      cityRegionId: [''],
      countyRegionId: [''],
      townRegionId: [''],
      sensorsize: ['', Validators.required],
      material: ['', Validators.required],
      gpsPosition: ['', Validators.required],
      dataCollectorId: ['', Validators.required],
      creatTime: ['', Validators.required],
      gpsId: ['', Validators.required],
      flowOutManholeNum: ['', Validators.required],
      inFlowManholeNum: ['', Validators.required],
      high: ['', Validators.required],
    };
    this.wellCoverFormBodyHtml = [
      // new FormHtml('井ID', 'manholeId', [[]], ''),
      // new FormHtml('省地区ID', 'provinceRegionId', [[]], ''),
      // new FormHtml('市地区ID', 'cityRegionId', [[]], ''),
      // new FormHtml('（县/区）地区ID', 'countyRegionId', [[]], ''),
      // new FormHtml('（镇/乡）地区ID', 'townRegionId', [[]], ''),
      new FormHtml('传感器个数', 'sensorsize', [[]], ''),
      new FormHtml('材质', 'material', [[]], ''),
      new FormHtml('GPS对应地址', 'gpsPosition', [[]], ''),
      new FormHtml('数据收集器', 'dataCollectorId', [[]], ''),
      new FormHtml('创建时间', 'creatTime', [[]], ''),
      new FormHtml('GPSID', 'gpsId', [[]], ''),
      new FormHtml('出井个数', 'flowOutManholeNum', [[]], ''),
      new FormHtml('进井个数', 'inFlowManholeNum', [[]], ''),
      new FormHtml('井高度(单位 / 米)', 'high', [[]], ''),
    ];
    // 进井
    this.enterFormsBody = {
      manholeId: [{value: '', disabled: true}, Validators.required],
      inFlowRelationId: ['', Validators.required],
      inFlowPipeId: ['', Validators.required],
      inFlowPipeRadius: ['', Validators.required],
      inFlowPipeSlope: ['', Validators.required],
      inFlowPipeLength: ['', Validators.required],
    };
    this.enterFormBodyHtml = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('进井ID', 'inFlowRelationId', [[]], ''),
      new FormHtml('进井管道ID', 'inFlowPipeId', [[]], ''),
      new FormHtml('进井管道半径', 'inFlowPipeRadius', [[]], ''),
      new FormHtml('进井管道倾斜度', 'inFlowPipeSlope', [[]], ''),
      new FormHtml('进井管道长度', 'inFlowPipeLength', [[]], ''),
    ];
    // 出井
    this.outFormsBody = {
      manholeId: [{value: '', disabled: true}, Validators.required],
      flowOutRelationId: ['', Validators.required],
      flowOutPipeId: ['', Validators.required],
      flowOutPipeRadius: ['', Validators.required],
      flowOutPipeSlope: ['', Validators.required],
      flowOutPipeLength: ['', Validators.required],
    };
    this.outFormBodyHtml = [
      new FormHtml('井ID', 'manholeId', [[]], ''),
      new FormHtml('出井ID', 'flowOutRelationId', [[]], ''),
      new FormHtml('出井管道ID', 'flowOutPipeId', [[]], ''),
      new FormHtml('出井管道半径', 'flowOutPipeRadius', [[]], ''),
      new FormHtml('出井管道倾斜度', 'flowOutPipeSlope', [[]], ''),
      new FormHtml('出井管道长度', 'flowOutPipeLength', [[]], ''),
    ];
    // 井ID保持一致
    this.wellCoverForm = this.fb.group(this.wellCoverFormsBody);
    this.wellID.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
      this.wellCoverForm.patchValue({manholeId: value});
      this.enterFormsBody.manholeId[0].value = value;
      this.outFormsBody.manholeId[0].value = value;
      if (this.enterForms.length > 0) {
        for (let i = 0; i < this.enterForms.length; i++) {
          this.enterForms[i].patchValue({manholeId: value});
        }
      }
      if (this.outForms.length > 0) {
        for (let i = 0; i < this.outForms.length; i++) {
          this.outForms[i].patchValue({manholeId: value});
        }
      }
    });
  }
  // 获取地区ID
  public getRegionInfo(e): void {
    this.wellCoverForm.patchValue(e);
  }
  // 井tabs选项
  public changeBgColor(e, content, form): void {
    const parent = e.srcElement.parentNode.parentElement;
    // 判断进入要添加的表单是否有已存在的表单，并改变 formValid 的值
    if (form) {
      if (form.length >= 0) {
        if (form.length === 0) {
          this.formValid = true;
        }else {
          if (form[form.length - 1].valid) {
            this.formValid = true;
          }else {
            this.formValid = false;
          }
        }
      }
    }
    // 显示当前要增加的表单内容
    for (let i = 0; i < content.parentNode.children.length; i++) {
        if (content.parentNode.children[i] === content) {
          content.style.display = 'block';
        } else {
          content.parentNode.children[i].style.display = 'none';
        }
    }
    // 设置当前处于焦点元素的背景颜色
    for (let i = 0; i < parent.children.length - 1; ++i) {
      if (parent.children[i].children[0] === e.target) {
        e.target.style.backgroundColor = '#37606C';
      }else {
        parent.children[i].children[0].style.backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
  }
  /**
   *  进井和出井操作
   * */
  // 增加表
  public addForm(template: TemplateRef<any>, forms: string): void {
    // 当还没有添加表单时，可以添加第一个表单。当要添加下一个表单时，会校验上一个表单是否合法，如果合法，则可以添加，否则添加失败
    if (this.formValid && this[forms].length === 0) {
      this[forms + this[forms].length] = this.fb.group(this[forms + 'Body']);
      this[forms].push(this[forms + this[forms].length]);
      this.formValid = false;
    }else {
      if (this[forms][this[forms].length - 1].valid) {
        this[forms + this[forms].length] = this.fb.group(this[forms + 'Body']);
        this[forms].push(this[forms + this[forms].length]);
        this.formValid = false;
      }else {
        this.modalRef = this.modalService.show(template);
        this.formValid = false;
      }
    }
  }
  // 删除表
  public deleteForm(forms, form): void {
    forms.splice(forms.indexOf(form), 1);
    if (forms.length === 0) {
      this.formValid = true;
    }
  }
/**
 * 提交井的的全部表单信息
 * */
  public submitAllFormInfo(e): void {
    // 在保存数据时，先清空 wellBaseInfo
      this.wellBaseInfo.manholeCoverInfo = null;
      this.wellBaseInfo.inFlowManholelist = [];
      this.wellBaseInfo.flowOutManholelist = [];
    // 取消冒泡行为
    e.stopPropagation();
    // 获取选项卡元素
    const tabs = document.querySelector('.wellTabsMenu');
    // 用来记录每个模块的表单是否验证成功
    let cover;
    let enter;
    let out;
    let moduleId;
    // 在提交之前，验证每一个模块中的表单是否有效
    // 首先验证井盖表单
    if (this.wellCoverForm.valid) {
      cover = true;
      this.wellBaseInfo.manholeCoverInfo = this.wellCoverForm.value;
    } else {
      cover = false;
      this.allFormsValid = true;
      const wellCover = document.querySelector('.wellCover');
      // 显示验证不通过的表单项，并使其成为焦点
      for (let i = 0; i < wellCover.parentElement.children.length; i++) {
        if (wellCover.parentElement.children[i] === wellCover) {
          wellCover['style'].display = 'block';
        } else {
          wellCover.parentElement.children[i]['style'].display = 'none';
        }
      }
      for (let i = 0; i < tabs.children.length - 1; ++i) {
        if (i === 0) {
          tabs.children[i].children[0]['style'].backgroundColor = '#37606C';
        }else {
          tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
        }
      }
    }
    // 验证进井全部表单
    if (this.enterForms.length > 0) {
        if (this.enterForms[this.enterForms.length - 1].valid) {
          enter = true;
          for (let i = 0; i < this.enterForms.length; i++) {
            this.wellBaseInfo.inFlowManholelist.push(this.enterForms[i].value);
          }
        }else {
          enter = false;
          this.allFormsValid = true;
          const enterWell = document.querySelector('.enterWell');
          // 显示验证不通过的表单项，并使其成为焦点
          for (let i = 0; i < enterWell.parentElement.children.length; i++) {
            if (enterWell.parentElement.children[i] === enterWell) {
              enterWell['style'].display = 'block';
            } else {
              enterWell.parentElement.children[i]['style'].display = 'none';
            }
          }
          for (let i = 0; i < tabs.children.length - 1; ++i) {
            if (i === 1) {
              tabs.children[i].children[0]['style'].backgroundColor = '#37606C';
            }else {
              tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
            }
          }
        }
    }else {
      enter = true;
      delete this.wellBaseInfo.inFlowManholelist;
    }
    // 验证出井全部表单
    if (this.outForms.length > 0) {
      if (this.outForms[this.outForms.length - 1].valid) {
        out = true;
        for (let i = 0; i < this.outForms.length; i++) {
          this.wellBaseInfo.flowOutManholelist.push(this.outForms[i].value);
        }
      }else {
        out = false;
        this.allFormsValid = true;
        const outWell = document.querySelector('.outWell');
        // 显示验证不通过的表单项，并使其成为焦点
        for (let i = 0; i < outWell.parentElement.children.length; i++) {
          if (outWell.parentElement.children[i] === outWell) {
            outWell['style'].display = 'block';
          } else {
            outWell.parentElement.children[i]['style'].display = 'none';
          }
        }
        for (let i = 0; i < tabs.children.length - 1; ++i) {
          if (i === 2) {
            tabs.children[i].children[0]['style'].backgroundColor = '#37606C';
          }else {
            tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
          }
        }
      }
    }else {
      out = true;
      delete this.wellBaseInfo.flowOutManholelist;
    }
    // 验证模块ID是否输入
    if (this.wellBaseInfo.manholeMode) {
      if (this.wellBaseInfo.manholeMode.indexOf(' ') === -1) {
        moduleId = true;
      }else {
        moduleId = false;
      }
    }else {
      moduleId = false;
    }
    if (!moduleId) {
      const mid = document.querySelector('.moduleId');
      // 显示验证不通过的表单项，并使其成为焦点
      for (let i = 0; i < mid.parentElement.children.length; i++) {
        if (mid.parentElement.children[i] === mid) {
          mid['style'].display = 'block';
        } else {
          mid.parentElement.children[i]['style'].display = 'none';
        }
      }
      for (let i = 0; i < tabs.children.length - 1; ++i) {
        if (i === 3) {
          tabs.children[i].children[0]['style'].backgroundColor = '#37606C';
        }else {
          tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
        }
      }
    }
  // 验证合法之后，向服务器提交井信息
    if (cover && enter && out && moduleId) {
      if (this.wellCoverForm.get('cityRegionId').value === '') {
        this.validRegion = true;
      }else {
        this.req.addBaseWell(this.wellBaseInfo).then(value => {
          console.log(value);
        });
      }
    }
  }
}
