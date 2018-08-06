import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {UserInfo} from './global.service';
import {CommonfunService} from './commonfun.service';

@Injectable()
export class ReqService {
  private  headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  constructor(
    private http: HttpClient,
    private commonfun: CommonfunService
  ) { }
  // 请求函数封装, 返回一个promise
  private ajaxRest(url: string, datas: any): Promise<any> {
    return new Promise(function (resolve, reject) {
        $.ajax({
          url: url,
          type: 'POST',
          async: false,
          cache: false,
          headers: {
            'accessToken': sessionStorage.getItem('token')
          },
          data: datas,
          contentType: 'application/x-www-form-urlencoded',
          success: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }
  // 登陆验证
  public Login(body): Observable<any> {
    return this.http.post('http://192.168.28.151:8082/pipe-network-Manager/login', body, this.headers);
  }
  // 登出
  public Logout(body): Observable<any> {
    return this.http.post('', body);
  }
  // 强制登出
  public ForcedLogout(body): Observable<any> {
    return this.http.post('', body);
  }
  // 更新登录时间
  public SidUpdate(body): Observable<any> {
    return this.http.post('', body);
  }
  // 登录用户信息查询
  public getUserInfo(body): Observable<any> {
    return this.http.post('', body);
  }
  // 登录用户信息修改
  public UserInfoModify(body): Observable<any> {
    return this.http.post('', body);
  }
  // 增加用户
  // 接收实例化后的 user 对象
  // 返回值数据
  public addUser(newUser: UserInfo): Promise<any> {
    // const datas = this.commonfun.serialize(newUser);
    return this.ajaxRest('http://192.168.28.151:8082/pipe-network-Manager/insertUser', this.commonfun.serialize(newUser));
  }

  // 删除用户
  public deleteUser(userId: any): Observable<any> {
    return this.http.post('', userId);
  }
  // 更新用户
  public updateUser(updateUserInfo: UserInfo): Observable<any> {
    return this.http.post('http://120.78.137.182:8888/pipe-network//updateUser', updateUserInfo);
  }
  // 查询全部用户
  public queryAllUser(params: any): Observable<any> {
    return this.http.post('http://120.78.137.182:8888/pipe-network//paingUser', params);
  }
// ----------------------------------------------------------------------------------------------------------------------
  // 按页查看井的基本信息
  public pagingWell(data: any): Promise<any> {
    return this.ajaxRest('http://192.168.28.151:8082/pipe-network-Manager/paingManhole', this.commonfun.serialize(data));
  }
  // 井基本信息
  public findWell(data: any): Promise<any> {
    return this.ajaxRest('http://192.168.28.151:8082/pipe-network-Manager/paingManhole', this.commonfun.serialize(data));
  }
  // 井详情信息
  public wellDetailInfo(data: any): Promise<any> {
    return this.ajaxRest('http://192.168.28.151:8082/pipe-network-Manager/detailedManhole', this.commonfun.serialize(data));
  }
  // 井增加
  public addWell(data): Promise<any> {
    return this.ajaxRest('http://192.168.28.151:8082/pipe-network-Manager/insertWell', data);
  }
  // 井删除
  public deleteWell(data): Promise<any> {
    return this.ajaxRest('', data);
  }
  // 井修改
  public updateWell(data): Promise<any> {
    return this.ajaxRest('', data);
  }
}
