import {Component, OnInit, TemplateRef} from '@angular/core';
import {WellAddFormsInfoService} from '../../../shared/well-add-forms-info.service';
import {ReqService} from '../../../shared/req.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {GlobalService, TextBox, ValidMsg} from '../../../shared/global.service';
import {CommonfunService} from '../../../shared/commonfun.service';
import {UniversalValidators} from 'ngx-validators';

@Component({
  selector: 'app-well-add',
  templateUrl: './well-add.component.html',
  styleUrls: ['./well-add.component.css']
})
export class WellAddComponent implements OnInit {
  // 操作后的状态
  public statusConfig = {
    waiting: false,
    finish: false,
    err: false,
    msg: ''
  };
  public wellDetailInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  public wellID: FormControl = new FormControl('', [Validators.required, UniversalValidators.maxLength(11)]); // 要实例化才能使用
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
  ) {
  }

  ngOnInit() {
    // 井盖的
    this.wellCoverFormsBody = {
      manholeId: [''],
      provinceRegionId: [''],
      cityRegionId: [''],
      countyRegionId: [''],
      townRegionId: [''],
      sensorsize: ['', [Validators.required, UniversalValidators.maxLength(5)]],
      material: ['', [Validators.required, UniversalValidators.maxLength(12)]],
      gpsPosition: ['', [Validators.required, UniversalValidators.maxLength(50)]],
      dataCollectorId: ['', [Validators.required, UniversalValidators.maxLength(12)]],
      creatTime: ['', [Validators.required]],
      gpsId: ['', [Validators.required, UniversalValidators.maxLength(30)]],
      flowOutManholeNum: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      inFlowManholeNum: ['', [Validators.required, UniversalValidators.maxLength(10)]]
    };
    this.wellCoverFormBodyHtml = [
      // new TextBox('井ID', 'manholeId', [new ValidMsg',, ' 'text', '), ',
      // new TextBox('省地区ID', 'provinceRegionId', [new ValidMsg',, ' 'text', '), ',
      // new TextBox('市地区ID', 'cityRegionId', [new ValidMsg',, ' 'text', '), ',
      // new TextBox('（县/区）地区ID', 'countyRegionId', [new ValidMsg',, ' 'text', '), ',
      // new TextBox('（镇/乡）地区ID', 'townRegionId', [new ValidMsg',, ' 'text', '), ',
      new TextBox('传感器个数', 'sensorsize', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不超过5位')], 'text', '', ''),
      new TextBox('材质', 'material', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不超过12位，中文不超过6位')], 'text', '', ''),
      new TextBox('GPS对应地址', 'gpsPosition', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不超过50位')], 'text', '', ''),
      new TextBox('数据收集器', 'dataCollectorId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不超过12位')], 'text', '', ''),
      new TextBox('创建时间', 'creatTime', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'date', '', ''),
      new TextBox('GPSID', 'gpsId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '输入经纬度，以英文逗号分隔，长度不超过30位')], 'text', '', ''),
      new TextBox('进井数量', 'inFlowManholeNum', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '输入经纬度，以英文逗号分隔，长度不超过30位')], 'text', '', ''),
      new TextBox('出井数量', 'flowOutManholeNum', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '输入经纬度，以英文逗号分隔，长度不超过30位')], 'text', '', ''),
    ];
    // 进井
    this.enterFormsBody = {
      manholeId: [''],
      inFlowRelationId: ['', [Validators.required, UniversalValidators.maxLength(11)]],
      inFlowPipeId: ['', [Validators.required, UniversalValidators.maxLength(20)]],
      inFlowPipeRadius: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      inFlowPipeSlope: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      inFlowPipeLength: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      modeId: [[]]
    };
    this.enterFormBodyHtml = [
      // new TextBox('井ID', 'manholeId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过5位')], 'text', '', ''),
      new TextBox('进井ID', 'inFlowRelationId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过11位')], 'text', '', ''),
      new TextBox('进井管道ID', 'inFlowPipeId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过20位')], 'text', '', ''),
      new TextBox('进井管道半径', 'inFlowPipeRadius', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      new TextBox('进井管道倾斜度', 'inFlowPipeSlope', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      new TextBox('进井管道长度', 'inFlowPipeLength', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      // new TextBox('模块ID', 'model', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过5位')], 'text', '), ',
    ];
    // 出井
    this.outFormsBody = {
      manholeId: [''],
      flowOutRelationId: ['', [Validators.required, UniversalValidators.maxLength(11)]],
      flowOutPipeId: ['', [Validators.required, UniversalValidators.maxLength(20)]],
      flowOutPipeRadius: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      flowOutPipeSlope: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      flowOutPipeLength: ['', [Validators.required, UniversalValidators.maxLength(10)]],
      modeId: ['']
    };
    this.outFormBodyHtml = [
      // new TextBox('井ID', 'manholeId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过5位')], 'text', '', ''),
      new TextBox('出井ID', 'flowOutRelationId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过11位')], 'text', '', ''),
      new TextBox('出井管道ID', 'flowOutPipeId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过20位')], 'text', '', ''),
      new TextBox('出井管道半径', 'flowOutPipeRadius', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      new TextBox('出井管道倾斜度', 'flowOutPipeSlope', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      new TextBox('出井管道长度', 'flowOutPipeLength', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过10位')], 'text', '', ''),
      // new TextBox('模块ID', 'model', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '长度不能超过5位')], 'text', '), ',
    ];
    // 传感器
    this.sensorsFormsBody = {
      initialManholeId: [{value: '', disabled: true}, [Validators.required, UniversalValidators.maxLength(11)]],
      sensormode: ['', [Validators.required, UniversalValidators.maxLength(5)]],
      modeId: ['', [Validators.required, UniversalValidators.maxLength(5)]],
      hight: ['', [Validators.required, UniversalValidators.maxLength(20)]],
      modePlace: ['', [Validators.required, UniversalValidators.maxLength(1)]],
      conduitId: ['', [Validators.required, UniversalValidators.maxLength(20)]],
      dataCollectorId: ['', [Validators.required, UniversalValidators.maxLength(12)]],
    };
    this.sensorsFormBodyHtml = [
      // new TextBox('井ID', 'initialManholeId', [new ValidMsg',, ' 'text', '', ''),
      new TextBox('传感器所属模式', 'sensormode', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度不能超过5位的整数', ''),
      new TextBox('模块ID', 'modeId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度不能超过5位的整数', ''),
      new TextBox('高度', 'hight', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度不能超过20位', ''),
      new TextBox('传感器在模块中的位置', 'modePlace', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度为1位', ''),
      new TextBox('导管ID', 'conduitId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度不能超过20位', ''),
      new TextBox('数据收集器ID', 'dataCollectorId', [new ValidMsg('required', '必填项'), new ValidMsg('maxLength', '')], 'text', '长度不能超过12位', '')
    ];
    // 井ID保持一致
    this.wellCoverForm = this.fb.group(this.wellCoverFormsBody);
    this.wellID.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        console.log(value);
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
      } else {
        if (form[form.length - 1].valid) {
          this.formValid = true;
        } else {
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
      } else {
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
        label.innerHTML = '模块Id' + (groups[j].children.length + 1) + ':';
        groups[j].appendChild(form_group);
      }
    }
  }

  public saveCurrentModelId(form, e): void {
    console.log(form);
    const content = e.srcElement.parentNode.parentNode;
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
    } else {
      if (this[forms][this[forms].length - 1].valid) {
        this[forms + this[forms].length] = this.fb.group(this[forms + 'Body']);
        this[forms].push(this[forms + this[forms].length]);
        this.formValid = false;
      } else {
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
    // 在保存数据时，先清空 wellDetailInfo
    this.wellDetailInfo.manholeCoverInfo = null;
    this.wellDetailInfo.inFlowManholelist = [];
    this.wellDetailInfo.flowOutManholelist = [];
    this.wellDetailInfo.sensorInfoList = [];
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
      this.wellDetailInfo.manholeCoverInfo = this.wellCoverForm.value;
    } else {
      cover = false;
      this.allFormsValid = true;
      this.validAfterFocus('.wellCover');
    }
    // 验证进井全部表单
    if (this.enterForms.length > 0) {
      for (let i = 0; i < this.enterForms.length; i++) {
        if (this.enterForms[i].valid) {
          enter = true;
            this.wellDetailInfo.inFlowManholelist.push(this.enterForms[i].value);
        } else {
          enter = false;
          this.allFormsValid = true;
          this.validAfterFocus('.enterWell');
          break;
        }
      }
    } else {
      enter = true;
      this.wellDetailInfo.inFlowManholelist = [];
    }
    // 验证出井全部表单
    if (this.outForms.length > 0) {
    for (let i = 0; i < this.outForms.length; i++) {
        if (this.outForms[i].valid) {
          out = true;
          this.wellDetailInfo.flowOutManholelist.push(this.outForms[i].value);
        } else {
          out = false;
          this.allFormsValid = true;
          this.validAfterFocus('.outWell');
          break;
        }
    }
    } else {
      out = true;
      this.wellDetailInfo.flowOutManholelist = [];
    }

    // 验证传感器全部表单
    if (this.sensorsForms.length > 0) {
      for (let i = 0; i < this.sensorsForms.length; i++) {
        if (this.sensorsForms[i].valid) {
          sensor = true;
          this.wellDetailInfo.sensorInfoList.push(this.sensorsForms[i].value);
        } else {
          sensor = false;
          this.allFormsValid = true;
          this.validAfterFocus('.sensors');
          break;
        }
      }
    } else {
      sensor = true;
      this.wellDetailInfo.sensorInfoList = [];
    }
    // 验证合法之后，向服务器提交井信息
    if (cover && enter && out && sensor) {
      if (this.wellCoverForm.get('cityRegionId').value === '') {
        this.validRegion = true;
      } else {
        this.statusConfig.waiting = true;
        this.req.addWell(this.wellDetailInfo).then(value => {
          this.statusConfig.waiting = false;
          // 10：添加成功
          // 11：添加失败
          // 12:井Id已存在
          if (Number(value.start) === 10) {
            this.statusConfig.msg = '';
            this.statusConfig.finish = true;
          } else if (Number(value.start) === 11) {
            this.statusConfig.msg = '添加失败';
          } else if (Number(value.start) === 12) {
            this.statusConfig.msg = '井Id已存在';
          } else {
            this.statusConfig.msg = '未知错误';
          }
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
      } else {
        tabs.children[i].children[0]['style'].backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
  }

  // 清除屏幕
  public cleanScreen(): void {
    this.statusConfig.waiting = false;
    this.statusConfig.finish = false;
    this.statusConfig.err = false;
    this.statusConfig.msg = '';
    this.validRegion = false;
    this.allFormsValid = false;
  }
}
