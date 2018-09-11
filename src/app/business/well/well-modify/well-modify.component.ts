import {Component, OnInit, TemplateRef} from '@angular/core';
import {ReqService} from '../../../shared/req.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {TextBox} from '../../../shared/global.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-well-modify',
  templateUrl: './well-modify.component.html',
  styleUrls: ['./well-modify.component.css']
})
export class WellModifyComponent implements OnInit {
  // 操作后的状态
  public statusConfig = {
    waiting: false,
    finish: false,
    err: false,
    msg: ''
  };
  protected regionInfo = {
    provinceRegionId: '',
    cityRegionId: '',
    countyRegionId: '',
    townRegionId: ''
  };
  public manholeCoverInfo: any;
  public inFlowManholelist: any;
  public flowOutManholelist: any;
  public sensorInfoList: any;
  protected isFillInWellId = true;
  public wellDeatilInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  public wellID: FormControl = new FormControl(); // 要实例化才能使用
  public modalRef: BsModalRef;
  public formValid = true;
  public allFormsValid = false;
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
  // 其他
  public validRegion = false;
  public backUrl: string;
  public controlBackBtn = false;
  public wellInputId = '';
  constructor(
    private router: Router,
  private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private modalService: BsModalService,
    private req: ReqService
  ) {
  }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((data) => {
      console.log(data);
      if (data.id) {
        this.getWellId(data.id);
        this.isFillInWellId = false;
        this.backUrl = data.parentUrl;
        this.controlBackBtn = true;
      }
    });
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
    };
    this.wellCoverFormBodyHtml = [
      // new TextBox('井ID', 'manholeId', [[]], 'text', '), ',
      // new TextBox('省地区ID', 'provinceRegionId', [[]], 'text', '长度不能超过11位', ''),
      // new TextBox('市地区ID', 'cityRegionId', [[]], 'text', '长度不能超过11位', ''),
      // new TextBox('（县/区）地区ID', 'countyRegionId', [[]], 'text', '长度不能超过11位', ''),
      // new TextBox('（镇/乡）地区ID', 'townRegionId', [[]], 'text', '长度不能超11位', ''),
      new TextBox('传感器个数', 'sensorsize', [[]], 'text', '长度不能超过5位', ''),
      new TextBox('材质', 'material', [[]], 'text', '长度不能超过12位，中文不超过6位', ''),
      new TextBox('GPS对应地址', 'gpsPosition', [[]], 'text', '长度不能超过50位', ''),
      new TextBox('数据收集器', 'dataCollectorId', [[]], 'text', '长度不能超过12位', ''),
      new TextBox('创建时间', 'creatTime', [[]], 'date', '', ''),
      new TextBox('GPSID', 'gpsId', [[]], 'text', '输入经纬度，中间以英文逗号隔开', ''),
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
      // new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('进井ID', 'inFlowRelationId', [[]], 'text', '长度不能超过11位', ''),
      new TextBox('进井管道ID', 'inFlowPipeId', [[]], 'text', '长度不能超过20位', ''),
      new TextBox('进井管道半径', 'inFlowPipeRadius', [[]], 'text', '长度不能超过10位', ''),
      new TextBox('进井管道倾斜度', 'inFlowPipeSlope', [[]], 'text', '长度不能超过10位', ''),
      new TextBox('进井管道长度', 'inFlowPipeLength', [[]], 'text', '长度不能超过10位', ''),
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
      // new TextBox('井ID', 'manholeId', [[]], 'text', '', ''),
      new TextBox('出井ID', 'flowOutRelationId', [[]], 'text', '长度不能超过11位', ''),
      new TextBox('出井管道ID', 'flowOutPipeId', [[]], 'text', '长度不能超过20位', ''),
      new TextBox('出井管道半径', 'flowOutPipeRadius', [[]], 'text', '长度不能超过10位', ''),
      new TextBox('出井管道倾斜度', 'flowOutPipeSlope', [[]], 'text', '长度不能超过10位', ''),
      new TextBox('出井管道长度', 'flowOutPipeLength', [[]], 'text', '长度不能超过10位', ''),
    ];
    // 传感器
    this.sensorsFormsBody = {
      initialManholeId: ['', Validators.required],
      sensormode: ['', Validators.required],
      modeId: ['', Validators.required],
      hight: ['', Validators.required],
      modePlace: ['', Validators.required],
      conduitId: [''],
      dataCollectorId: ['', Validators.required],
    };
    this.sensorsFormBodyHtml = [
      // new TextBox('井ID', 'initialManholeId', [[]], 'text', '', ''),
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
  // 返回上一层按钮控制
  public previousLayer(): void {
    if (this.backUrl) {
      this.router.navigate([this.backUrl]);
    }else {
      this.isFillInWellId = !this.isFillInWellId;
    }
  }
  // 获取地区ID
  public getRegionInfo(e): void {
    this.wellCoverForm.patchValue(e);
  }
  // 获取井ID并写入相应的表单进行修改
  public getWellId(id) {
    const wellId = typeof id === 'object' ? id.value : id;
    if (wellId !== '') {
      this.req.wellDetailInfo({manholeId: wellId}).then(value => {
        console.log(value);
        this.manholeCoverInfo = value['msg']['manholeCoverInfo'];
        this.inFlowManholelist = value['msg']['inFlowManholelist'];
        this.flowOutManholelist = value['msg']['flowOutManholelist'];
        this.sensorInfoList = value['msg']['sensorInfoList'];
        // 拿到返回数据后，以表单的形式来显示出来，以便用户进行修改
        if (this.manholeCoverInfo) {
          console.log(1);
          this.wellCoverForm.patchValue(this.manholeCoverInfo);
          this.wellInputId = this.manholeCoverInfo.manholeId;
          this.regionInfo.provinceRegionId = this.manholeCoverInfo.provinceRegionId;
          this.regionInfo.cityRegionId = this.manholeCoverInfo.cityRegionId;
          this.regionInfo.countyRegionId = this.manholeCoverInfo.countyRegionId;
          this.regionInfo.townRegionId = this.manholeCoverInfo.townRegionId;
        }else {
          this.isFillInWellId = true;
          if (typeof id === 'object') {
            console.log(2);
            this.statusConfig.msg = '无效井ID';
          }
          return null;
        }
        if (this.inFlowManholelist.length) {
          if (this.inFlowManholelist.length > 0) {
            for (let i = 0; i < this.inFlowManholelist.length; i++) {
              this.addForm(null, 'enterForms');
              this.enterForms[i].patchValue(this.inFlowManholelist[i]);
              const modelBody = document.querySelector('.enterWell modelBody');
              if (this.inFlowManholelist[i]['modeId']) {
                for (let j = 0; j < this.inFlowManholelist[i].modeId.length; j++) {
                  this.initAddModelId(modelBody, this.inFlowManholelist[i].modeId[j]);
                }
              }
            }
          }
        }
        if (this.flowOutManholelist.length) {
          this.formValid = true;
          if (this.flowOutManholelist.length > 0) {
            for (let i = 0; i < this.flowOutManholelist.length; i++) {
              this.addForm(null, 'outForms');
              this.outForms[i].patchValue(this.flowOutManholelist[i]);
              const modelBody = document.querySelector('.outWell modelBody');
              if (this.flowOutManholelist[i]['modeId']) {
                for (let j = 0; j < this.flowOutManholelist[i].modeId.length; j++) {
                  this.initAddModelId(modelBody, this.flowOutManholelist[i].modeId[j]);
                }
              }
            }
          }
        }
        if (this.sensorInfoList.length) {
          this.formValid = true;
          if (this.sensorInfoList.length > 0) {
            for (let i = 0; i < this.sensorInfoList.length; i++) {
              this.addForm(null, 'sensorsForms');
              this.sensorsForms[i].patchValue(this.sensorInfoList[i]);
            }
          }
        }
        setTimeout(() => this.isFillInWellId = false, 500);
      });
    } else {
      if (typeof id === 'object') {
        id.setAttribute('placeholder', '井ID不能为空');
      }
    }
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
    // 在保存数据时，先清空 wellBaseInfo
    this.wellDeatilInfo.manholeCoverInfo = null;
    this.wellDeatilInfo.inFlowManholelist = [];
    this.wellDeatilInfo.flowOutManholelist = [];
    this.wellDeatilInfo.sensorInfoList = [];
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
      this.wellDeatilInfo.manholeCoverInfo = this.wellCoverForm.value;
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
          this.wellDeatilInfo.inFlowManholelist.push(this.enterForms[i].value);
        }
      } else {
        enter = false;
        this.allFormsValid = true;
        this.validAfterFocus('.enterWell');
      }
    } else {
      enter = true;
      this.wellDeatilInfo.inFlowManholelist = [];
    }
    // 验证出井全部表单
    if (this.outForms.length > 0) {
      if (this.outForms[this.outForms.length - 1].valid) {
        out = true;
        for (let i = 0; i < this.outForms.length; i++) {
          this.wellDeatilInfo.flowOutManholelist.push(this.outForms[i].value);
        }
      } else {
        out = false;
        this.allFormsValid = true;
        this.validAfterFocus('.outWell');
      }
    } else {
      out = true;
      this.wellDeatilInfo.flowOutManholelist = [];
    }

    // 验证传感器全部表单
    if (this.sensorsForms.length > 0) {
      if (this.sensorsForms[this.sensorsForms.length - 1].valid) {
        sensor = true;
        for (let i = 0; i < this.sensorsForms.length; i++) {
          this.wellDeatilInfo.sensorInfoList.push(this.sensorsForms[i].value);
        }
      } else {
        sensor = false;
        this.allFormsValid = true;
        this.validAfterFocus('.sensors');
      }
    } else {
      sensor = true;
      this.wellDeatilInfo.sensorInfoList = [];
    }
    // 验证合法之后，向服务器提交井信息
    if (cover && enter && out && sensor) {
      if (this.wellCoverForm.get('cityRegionId').value === '') {
        this.validRegion = true;
      } else {
        this.statusConfig.waiting = true;
        this.statusConfig.msg = '正在提交.....';
        this.req.updateWell(this.wellDeatilInfo).then(value => {
          this.statusConfig.waiting = false;
          // 10:更新成功
          // 11:更新失败
          if (Number(value.state) === 10) {
            this.statusConfig.msg = '';
            this.statusConfig.finish = true;
            setTimeout(() => {
              this.statusConfig.finish = false;
            }, 1000);
          }else if (Number(value.state) === 10) {
            this.statusConfig.msg = '更新失败';
          }else {
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

  public initAddModelId(ele, value: string): void {
    // 向当前模块Id增加框的添加一个输入框，同时自动获取焦点
    const groups = document.getElementById(ele).children;
    const form_group = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    form_group.setAttribute('class', 'form-group');
    form_group.style.marginLeft = '10px';
    form_group.style.cssFloat = 'left';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', '请输入Id');
    input.innerText = value;
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
  // 清理屏幕
  public cleanScreen(): void {
    this.validRegion = false;
    this.statusConfig.msg = '';
    this.allFormsValid = false;
  }
}
