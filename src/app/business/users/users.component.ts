import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageBody, UsersManager} from '../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public Users: Array<UsersManager>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
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
  public addFields: Array<Form>;
  constructor(public modalService: BsModalService,
              public req: ReqService,
              public fb: FormBuilder) {}

  ngOnInit() {
    this.addFields = [
       new Form('身份证号码', 'idCardNo', [['required', '此项为必填']]),
       new Form('账号', 'username', [['required', '此项为必填']]),
       new Form('密码', 'password', [['required', '此项为必填']]),
       new Form('用户性别', 'gender', [['required', '此项为必填']]),
       new Form('用户年纪', 'age', [['required', '此项为必填']]),
       new Form('用户电话', 'phone', [['required', '此项为必填']]),
       new Form('用户住址', 'address', [['required', '此项为必填']]),
       new Form('姓名', 'name', [['required', '此项为必填']]),
       new Form('账号是否锁定', 'locked', [['required', '此项为必填']]),
       new Form('角色id', 'roleId', [['required', '此项为必填']]),
       new Form('省地区id', 'provinceRegionId', [['required', '此项为必填']]),
       new Form('市地区Id', 'cityRegionId', [['required', '此项为必填']]),
       new Form('（县/区）地区Id', 'countyRegionId', [['required', '此项为必填']]),
       new Form('（镇或者乡）地区Id', 'townRegionId', [['required', '此项为必填']]),
       new Form('管辖地区名称', 'managementArea', [['required', '此项为必填']]),
      ]
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
    this.userModifyForm = this.fb.group({

    });

    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    // 对表格的初始化
  }
  public SelectAddModalId(value): void {
    this.userAddForm.patchValue({'WellId': value});
  }
  public SelectModifyModalId(value): void {
    this.userModifyForm.patchValue({'WellId': value});
  }
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
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
      this.hasChecked.splice(this.Users.length, 10);
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
      this.userDetail = this.Users[this.hasChecked[0]];
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
        this.req.UsersManagerDelete({id: this.Users[this.hasChecked[j]].id})
          .subscribe(status => {
            this.status = Number(status.status);
            if (j === haschecklen - 1) {
              this.Update();
            }
          });
      }
    }

  }
  // 用户的添加 并且 重新请求数据，防止增加的是第十一条表格
  public userAdd(): void {
    $.ajax({
      url: 'http://192.168.28.65:8080/pipe-network-Manager/insertUser',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': sessionStorage.getItem('token')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: (datas) => {
        console.log(datas);
      },
      error: (err) => {
        console.log(err);
      }
    });
    if (this.userAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerAdd(this.userAddForm.value)
        .subscribe(status => {
          this.status = Number(status.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public userModify(): void {
    if (this.userModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerModify(this.userModifyForm.value)
        .subscribe(status => {
          this.status = Number(status.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 在增加， 删除，修改后即时刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.getUsersManager(this.pageBody)
      .subscribe(value => {
        this.Users = value.data;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
    this.req.getUsersManagerCount()
      .subscribe(num => {
        this.num = Math.ceil(num.data / 6);
      });
  }
}


export class Form {
  constructor(
    public name: string,
    public content: string,
    public valids: Array<Array<any>>,
  ) {}
}
