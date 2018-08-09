import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormHtml, UsePageQueryUser, UserInfo} from '../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import {CommonfunService} from '../../shared/commonfun.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public datas: Array<UserInfo>;
  public resDatas: any;
  public modalRef: BsModalRef;
  public pageBody: UsePageQueryUser;
  public num: number;
  public userDetail: any;
  public userAddForm: FormGroup;
  public userModifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public fields: Array<FormHtml>;
  constructor(
              public modalService: BsModalService,
              public req: ReqService,
              public fb: FormBuilder,
              private commonfun: CommonfunService
              ) {}

  ngOnInit() {
    this.pageBody = new UsePageQueryUser('', 1, 10, '', '', '', '');
    this.fields = [
      new FormHtml('身份证号码', 'idCardNo', [['required', '此项为必填']], ''),
      new FormHtml('账号', 'username', [['required', '此项为必填']], ''),
      new FormHtml('密码', 'password', [['required', '此项为必填']], ''),
      new FormHtml('用户性别', 'gender', [['required', '此项为必填']], ''),
      new FormHtml('用户年纪', 'age', [['required', '此项为必填']], ''),
      new FormHtml('用户电话', 'phone', [['required', '此项为必填']], ''),
      new FormHtml('用户住址', 'address', [['required', '此项为必填']], ''),
      new FormHtml('姓名', 'name', [['required', '此项为必填']], ''),
      new FormHtml('账号是否锁定', 'locked', [['required', '此项为必填']], ''),
      new FormHtml('角色id', 'roleId', [['required', '此项为必填']], ''),
      new FormHtml('省地区id', 'provinceRegionId', [['required', '此项为必填']], ''),
      new FormHtml('市地区Id', 'cityRegionId', [['required', '此项为必填']], ''),
      new FormHtml('（县/区）地区Id', 'countyRegionId', [['required', '此项为必填']], ''),
      new FormHtml('（镇或者乡）地区Id', 'townRegionId', [['required', '此项为必填']], ''),
      new FormHtml('管辖地区名称', 'managementArea', [['required', '此项为必填']], ''),
    ];
    //  增加模态框表单
    this.userAddForm = this.fb.group({
      idCardNo: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      locked: ['', Validators.required],
      roleId: ['', Validators.required],
      provinceRegionId: ['', Validators.required],
      cityRegionId: ['', Validators.required],
      countyRegionId: ['', Validators.required],
      townRegionId: ['', Validators.required],
      managementArea: ['', Validators.required]
    });
    //  修改表单内容
    this.userModifyForm = this.fb.group({
      idCardNo: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      locked: ['', Validators.required],
      roleId: ['', Validators.required],
      provinceRegionId: ['', Validators.required],
      cityRegionId: ['', Validators.required],
      countyRegionId: ['', Validators.required],
      townRegionId: ['', Validators.required],
      managementArea: ['', Validators.required]
    });

    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    // 对表格的初始化
    this.usePageQuery();
  }
  // 控制模态框
  public openuser(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.userDetail['organizationId'] = Number(this.userDetail['organizationId']);
      this.userModifyForm.reset(this.userDetail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openuserAdd(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.modalRef = this.modalService.show(template);
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.datas.length, 10);
      this.checked = 'checked';
    } else {
      this.hasChecked = [];
      this.checked = '';
    }
  }
  // 得到已选择的checkBox
  public getCheckBoxStatus(e, i): void {
    const haschecklen = this.hasChecked.length;
    if (e.srcElement.checked === true) {
      this.hasChecked.push(i);
    } else {
      for (let j = 0; j < haschecklen; j++) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.userDetail = this.datas[this.hasChecked[0]];
    } else {
      this.userDetail = null;
    }
  }
//  删除表格 并且 重新请求数据
  public deleteuser(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
        this.req.deleteUser({id: this.datas[this.hasChecked[j]].idCardNo})
          .subscribe(status => {
            this.status = Number(status.status);
            if (j === haschecklen - 1) {
              // this.Update();
            }
          });
      }
    }
  }
  // 用户的添加 并且 重新请求数据，防止增加的是第十一条表格
  public userAdd(): void {
    this.req.addUser(this.userAddForm.value).then(value => {
      console.log(value);
    });
  }
//  修改表格内容
  public userModify(): void {
    if (this.userModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateUser(this.userModifyForm.value)
        .subscribe(status => {
          this.status = Number(status.status);
          // this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 在增加， 删除，修改后即时刷新
  // 按页差选请求
  public usePageQuery(): void {
    this.req.pagingUser(this.pageBody).then(value => {
      this.datas = value.paingmsg.datas;
      this.resDatas = value;
    });
  }
}
