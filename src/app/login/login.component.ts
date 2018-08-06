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
    private localSessionStorage: GlobalService,
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
    this.router.navigate(['/home']);
    this.req.Login(this.commonfun.serialize(this.userLoginInfoForm.value)).subscribe((res) => {
      console.log(res);
      if (Number(res['msg']) === 14) {
        this.router.navigate(['/home']);
        sessionStorage.setItem('token', res['token']);
      }else {
        this.resMsg = '登录失败!';
      }
    });
  }
}
