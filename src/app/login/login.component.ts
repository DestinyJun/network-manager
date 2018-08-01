import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// 192.168.138.1:8080
// http://192.168.138.1:8080/pipe-network-Manager/login
export class LoginComponent implements OnInit {
  // 表单
  public userLoginInfoForm: FormGroup;
  // 保存返回的登录信息
  public resMsg: string;
  public status: number;
  public formUsername: any;
  public formPassword: any;
  private route: any;
  constructor(
    private req: ReqService,
    private fb: FormBuilder,
    private router: Router,
    private localSessionStorage: GlobalService,
    private http: HttpClient
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
  const headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  this.http.post('http://192.168.28.65:8080/pipe-network-Manager/login', this.paramsJSON(this.userLoginInfoForm.value), headers).subscribe((res) => {
      if (Number(res['msg']) === 14) {
        this.router.navigate(['/home']);
        sessionStorage.setItem('token', res['token']);
      }else {
        this.resMsg = '登录失败!';
      }
    });
    // // this.router.navigate(['/home']);
    // $.ajax({
    //   url: 'http://192.168.138.1:8080/pipe-network-Manager/login',
    //   type: 'POST',
    //   async: false,
    //   data: this.paramsJSON(this.userLoginInfoForm.value),
    //   cache: false,
    //   headers: {
    //     contentType: 'application/x-www-form-urlencoded',
    //   },
    //   success: (datas) => {
    //     console.log(datas);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }

  public paramsJSON(value: Object): string {
    let result: string;
    for (const i in value) {
      if (result) {
        result += '&' + i + '=' + value[i];
      }else {
        result = i + '=' + value[i];
      }
    }
    console.log(result);
    return result;
  }
}
