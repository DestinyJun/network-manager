import {Component, OnInit, TemplateRef} from '@angular/core';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {GlobalService, TextBox} from '../../../shared/global.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-well-add',
  templateUrl: './well-add.component.html',
  styleUrls: ['./well-add.component.css']
})
export class WellAddComponent implements OnInit {
  public wellBaseInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  public wellID: FormControl = new FormControl(); // 要实例化才能使用
  public modalRef: BsModalRef;
  public formValid = true;
  public allFormsValid = false;
  public validRegion = false;
  // 井盖的
  private wellCoverFormsBody: any;
  public wellCoverFormBodyHtml: Array<TextBox> = [];
  public wellCoverForm: FormGroup;
  // 进井
  private enterFormsBody: any;
  public enterFormBodyHtml: Array<TextBox> = [];
  public enterForms: Array<FormGroup> = [];
  // 出井
  private outFormsBody: any;
  public outFormBodyHtml: Array<TextBox> = [];
  public outForms: Array<FormGroup> = [];
  // 传感器
  private sensorsFormsBody: any;
  public sensorsFormBodyHtml: Array<TextBox> = [];
  public sensorsForms: Array<FormGroup> = [];
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
    this.wellCoverFormsBody =  {
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
      inFlowManholeNum: ['', Validators.required]
    };
    this.wellCoverFormBodyHtml = [
      // new TextBox('井ID', 'manholeId', [[]], 'text', '), ',
      // new TextBox('省地区ID', 'provinceRegionId', [[]], 'text', '), ',
      // new TextBox('市地区ID', 'cityRegionId', [[]], 'text', '), ',
      // new TextBox('（县/区）地区ID', 'countyRegionId', [[]], 'text', '), ',
      // new TextBox('（镇/乡）地区ID', 'townRegionId', [[]], 'text', '), ',
      new TextBox('传感器个数', 'sensorsize', [[]], 'text', '长度不超过5位', ''),
      new TextBox('材质', 'material', [[]], 'text', '长度不超过12位，中文不超过6位', ''),
      new TextBox('GPS对应地址', 'gpsPosition', [[]], 'text', '长度不超过50位', ''),
      new TextBox('数据收集器', 'dataCollectorId', [[]], 'text', '长度不超过12位', ''),
      new TextBox('创建时间', 'creatTime', [[]], 'date', '', ''),
      new TextBox('GPSID', 'gpsId', [[]], 'text', '输入经纬度，以英文逗号分隔，长度不超过30位', ''),
      new TextBox('进井数量', 'inFlowManholeNum', [[]], 'text', '输入经纬度，以英文逗号分隔，长度不超过30位', ''),
      new TextBox('出井数量', 'flowOutManholeNum', [[]], 'text', '输入经纬度，以英文逗号分隔，长度不超过30位', ''),
    ];
    // 进井
    this.enterFormsBody = {
      manholeId: ['', Validators.required],
      inFlowRelationId: ['', Validators.required],
      inFlowPipeId: ['', Validators.required],
      inFlowPipeRadius: ['', Validators.required],
      inFlowPipeSlope: ['', Validators.required],
      inFlowPipeLength: ['', Validators.required],
      modeId: [[]]
    };
    this.enterFormBodyHtml = [
      new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('进井ID', 'inFlowRelationId', [[]], 'text', '长度不超过11位', ''),
      new TextBox('进井管道ID', 'inFlowPipeId', [[]], 'text', '长度不超过20位', ''),
      new TextBox('进井管道半径', 'inFlowPipeRadius', [[]], 'text', '长度不超过10位', ''),
      new TextBox('进井管道倾斜度', 'inFlowPipeSlope', [[]], 'text', '长度不超过10位', ''),
      new TextBox('进井管道长度', 'inFlowPipeLength', [[]], 'text', '长度不超过10位', ''),
    ];
    // 出井
    this.outFormsBody = {
      manholeId: ['', Validators.required],
      flowOutRelationId: ['', Validators.required],
      flowOutPipeId: ['', Validators.required],
      flowOutPipeRadius: ['', Validators.required],
      flowOutPipeSlope: ['', Validators.required],
      flowOutPipeLength: ['', Validators.required],
      modeId: [[]]
    };
    this.outFormBodyHtml = [
      new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('出井ID', 'flowOutRelationId', [[]], 'text', '长度不超过11位', ''),
      new TextBox('出井管道ID', 'flowOutPipeId', [[]], 'text', '长度不超过20位', ''),
      new TextBox('出井管道半径', 'flowOutPipeRadius', [[]], 'text', '长度不超过10位', ''),
      new TextBox('出井管道倾斜度', 'flowOutPipeSlope', [[]], 'text', '长度不超过10位', ''),
      new TextBox('出井管道长度', 'flowOutPipeLength', [[]], 'text', '长度不超过10位', ''),
    ];
    // 传感器
    this.sensorsFormsBody = {
      initialManholeId: [{value: '', disabled: true}, Validators.required],
      sensormode: ['', Validators.required],
      modeId: ['', Validators.required],
      hight: ['', Validators.required],
      modePlace: ['', Validators.required],
      conduitId: ['', Validators.required],
      dataCollectorId: ['', Validators.required],
    };
    this.sensorsFormBodyHtml = [
      new TextBox('井ID', 'initialManholeId', [[]], 'text', '', ''),
      new TextBox('传感器所属模式', 'sensormode', [[]], 'text', '长度不能超过5位的整数', ''),
      new TextBox('模块ID', 'modeId', [[]], 'text', '长度不能超过5位的整数', ''),
      new TextBox('高度', 'hight', [[]], 'text', '长度不能超过20位', ''),
      new TextBox('传感器在模块中的位置', 'modePlace', [[]], 'text', '长度为1位', ''),
      new TextBox('导管ID', 'conduitId', [[]], 'text', '长度不能超过20位', ''),
      new TextBox('数据收集器ID', 'dataCollectorId', [[]], 'text', '长度不能超过12位', '')
    ];
    // 井ID保持一致
    this.wellCoverForm = this.fb.group(this.wellCoverFormsBody);
    this.wellID.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.wellCoverForm.patchValue({manholeId: value});
        this.enterFormsBody.manholeId[0] = value;
        this.outFormsBody.manholeId[0] = value;
        this.sensorsFormsBody.initialManholeId[0] = value;
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
        if (this.sensorsForms.length > 0) {
          for (let i = 0; i < this.sensorsForms.length; i++) {
            this.sensorsForms[i].patchValue({initialManholeId: value});
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
    // 判断进入添加的表单是否有属于哪个增加表单，并改变 formValid 的值
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
   *  动态增加model输入框
   * */
  public openSelModelId(e): void {
    e.srcElement.parentNode.parentNode.lastElementChild.style.display = 'block';
  }
  public closeSelModelId(e): void {
    e.srcElement.parentNode.parentNode.parentNode.style.display = 'none';
  }
  public addModelId(e): void {
    // 向当前模块Id增加框的添加一个输入框，同时自动获取焦点
    const groups = e.srcElement.parentNode.children;
    const form_group = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    form_group.setAttribute('class', 'form-group');
    form_group.style.marginLeft = '10px';
    form_group.style.cssFloat = 'left';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', '请输入Id');
    input.style.color = '#000000';
    form_group.appendChild(label);
    form_group.appendChild(input);
    for (let j = 0; j < groups.length; j++) {
      if (groups[j].className === 'modelBody') {
        label.innerHTML  = '模块Id' + (groups[j].children.length + 1) + ':';
        groups[j].appendChild(form_group);
      }
    }
  }
  public saveCurrentModelId(form, e): void {
    console.log(form);
    const content  = e.srcElement.parentNode.parentNode;
    const values = [];
    for (let j = 0; j < content.children.length; j++) {
      if (content.children[j].className === 'modelBody') {
        const modelBody = content.children[j];
        for (let l = 0; l < modelBody.children.length; l++) {
          const value = modelBody.children[l].children[1].value;
          values.push(value);
        }
      }
    }
    form.patchValue({modeId: values});
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
    this.wellBaseInfo.sensorInfoList = [];
    // 取消冒泡行为
    e.stopPropagation();
    // 获取选项卡元素
    const tabs = document.querySelector('.wellTabsMenu');
    // 用来记录每个模块的表单是否验证成功
    let cover;
    let enter;
    let out;
    let sensor;
    // 在提交之前，验证每一个模块中的表单是否有效
    // 首先验证井盖表单
    if (this.wellCoverForm.valid) {
      cover = true;
      this.wellBaseInfo.manholeCoverInfo = this.wellCoverForm.value;
    } else {
      cover = false;
      this.allFormsValid = true;
      this.validAfterFocus('.wellCover');
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
        this.validAfterFocus('.enterWell');
      }
    }else {
      enter = true;
      this.wellBaseInfo.inFlowManholelist = [];
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
        this.validAfterFocus('.outWell');
      }
    }else {
      out = true;
      this.wellBaseInfo.flowOutManholelist = [];
    }

    // 验证传感器全部表单
    if (this.sensorsForms.length > 0) {
      if (this.sensorsForms[this.sensorsForms.length - 1].valid) {
        sensor = true;
        for (let i = 0; i < this.sensorsForms.length; i++) {
          this.wellBaseInfo.sensorInfoList.push(this.sensorsForms[i].value);
        }
      }else {
        sensor = false;
        this.allFormsValid = true;
        this.validAfterFocus('.sensors');
      }
    }else {
      sensor = true;
      this.wellBaseInfo.sensorInfoList = [];
    }
    // 验证合法之后，向服务器提交井信息
    if (cover && enter && out && sensor) {
      if (this.wellCoverForm.get('cityRegionId').value === '') {
        this.validRegion = true;
      }else {
        this.validRegion = false;
        this.req.addWell(this.wellBaseInfo).then(value => {
          console.log(value);
        });
      }
    }
  }
  // 表单在验证之后会获取焦点
  public validAfterFocus(className: string): void {
    const tabs = document.querySelector('.wellTabsMenu');
    const Ele = document.querySelector(className);
    let single;
    // 显示验证不通过的表单项，并使其成为焦点
    for (let i = 0; i < Ele.parentElement.children.length; i++) {
      if (Ele.parentElement.children[i] === Ele) {
        single = i;
        Ele['style'].display = 'block';
      } else {
        Ele.parentElement.children[i]['style'].display = 'none';
      }
    }
    for (let i = 0; i < tabs.children.length; ++i) {
      if (i === single) {
        tabs.children[i].children[0]['style'].backgroundColor = '#37606C';
      }else {
        tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
  }
}
