import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';
import {CommonfunService} from '../shared/commonfun.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 表单
  public userLoginInfoForm: FormGroup;
  // 保存返回的登录信息
  public resMsg: string;
  constructor(
    private req: ReqService,
    private fb: FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private commonfun: CommonfunService
  ) {
    this.userLoginInfoForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mode: ['web', Validators.required]
    });
  }
  ngOnInit() {
  }
  public OnSubmit(): void {
    // const region = [
    //   {
    //     'id':  1,
    //     'provinceRegionId':  '1',
    //     'cityList': [
    //       {
    //         'id':  1,
    //         'cityRegionId':  '1',
    //         'cityName':  '贵阳市',
    //         'provinceRegionId':  '1',
    //         'countyList': [
    //           {
    //             'id':  1,
    //             'countyRegionId':  'CN101260101',
    //             'countyName':  '贵阳',
    //             'cityRegionId':  '1'
    //           },
    //           {
    //             'id':  2,
    //             'countyRegionId':  'CN101260102',
    //             'countyName':  '白云',
    //             'cityRegionId':  '1'
    //           },
    //           {
    //             'id':  3,
    //             'countyRegionId':  'CN101260103',
    //             'countyName':  '花溪',
    //             'cityRegionId':  '1'
    //           }
    //         ]
    //       }
    //     ],
    //     'provinceName':  '贵州省'
    //   }
    // ];
    //
    // this.globalService.setRegion(region);

    this.req.Login(this.commonfun.serialize(this.userLoginInfoForm.value)).subscribe((res) => {
      console.log(res);
      console.log(res);
      if (Number(res['msg']) === 14) {
        this.router.navigate(['/home']);
        this.globalService.setRegion(res['region']);
        sessionStorage.setItem('token', res['token']);
      }else {
        this.resMsg = '登录失败!';
      }
    });
  }
}
