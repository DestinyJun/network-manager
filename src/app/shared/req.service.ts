import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {GlobalService, UserInfo} from './global.service';
import {CommonfunService} from './commonfun.service';

@Injectable()
export class ReqService {
  private IP_Port = 'http://120.78.137.182:8888';
  private  headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  constructor(
    private http: HttpClient,
    private commonfun: CommonfunService,
    private globalService: GlobalService
  ) { }
  // 请求函数封装, 返回一个promise
  private ajaxRest(url: string, datas: any): Promise<any> {
    const token = this.globalService.get('token');
    console.log(token);
    console.log(datas);
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: url,
        type: 'POST',
        async: false,
        cache: false,
        headers: {
          'accessToken': token
        },
        data: datas,
        contentType: 'application/x-www-form-urlencoded',
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          // reject(err);
          console.log('request error');
        }
      });
    });
  }
  // 登陆验证
  public Login(body): Observable<any> {
    return this.http.post(this.IP_Port + '/pipe-network-Manager/login', body, this.headers);
  }
  // 登出
  public Logout(): Observable<any> {
    return this.http.post(this.IP_Port + '/pipe-network-Manager/logout', null);
  }
  // 增加用户
  // 接收实例化后的 user 对象
  // 返回值数据
  public addUser(newUser: UserInfo): Promise<any> {
    // const datas = this.commonfun.serialize(newUser);
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/insertUser', this.commonfun.serialize(newUser));
  }
  // 查询全部用户
  public pagingUser(data: any): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/paingUser', data);
  }
// ----------------------------------------------------------------------------------------------------------------------
  // 按页查看井的基本信息
  public pagingWell(data: any): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/paingManhole', this.commonfun.serialize(data));
  }
  // 井基本信息
  public findWell(data: any): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/paingManhole', this.commonfun.serialize(data));
  }
  // 井详情信息
  public wellDetailInfo(data: any): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/detailedManhole', this.commonfun.serialize(data));
  }
  // 井详情信息增加
  public addWell(data): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/insertWell', data);
  }
  // 井基本信息增加
  public addBaseWell(data): Promise<any> {
    return this.ajaxRest(this.IP_Port + '/pipe-network-Manager/appInsertManhole', data);
  }
  // 井删除
  public deleteWell(data): Promise<any> {
    return this.ajaxRest('', data);
  }
  // 井修改
  public updateWell(data): Promise<any> {
    return this.ajaxRest('', data);
  }

  deleteuser(param: { id: string }) {
  }
}

