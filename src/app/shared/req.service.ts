import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observableToBeFn} from 'rxjs/testing/TestScheduler';

@Injectable()
export class ReqService {
  private  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient) { }
  // 登陆验证
  public Login(body): Observable<any> {
    return this.http.post('192.168.138.1:8080', body);
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
  public getDepartment(body): Observable<any> {
    return this.http.post('', body);
  }
  public getOrganization(body): Observable<any> {
    return this.http.post('', body);
  }
  public getUsersManagerCount(): Observable<any> {
    return this.http.post('', null, {
      headers: this.headers
    });
  }
  // 用户管理查询
  public getUsersManager(body): Observable<any> {
    console.log(body);
    return this.http.post('', body, {
      headers: this.headers
    });
  }
  // 用户管理增加
  public UsersManagerAdd(body): Observable<any> {
    return this.http.post('http://120.78.138.104:8080/Intelligent-pipe-network-Server-side-0.0.1-SNAPSHOT/inserterUser', body);
  }
  // 用户管理删除
  public UsersManagerDelete(body): Observable<any> {
    return this.http.post('http://120.78.138.104:8080/Intelligent-pipe-network-Server-side-0.0.1-SNAPSHOT/inserterUser', body);
  }
  // 用户管理修改
  public UsersManagerModify(body): Observable<any> {
    return this.http.post('http://120.78.138.104:8080/Intelligent-pipe-network-Server-side-0.0.1-SNAPSHOT/inserterUser', body);
  }

  // 井管理查看
  public findWelladd(body): Observable<any> {
    return this.http.post('', body, {
    });
  }
  // 井管理增加
  public addWelladd(body): Observable<any> {
    return this.http.post('', body, {
      headers: this.headers
    });
  }
  // 井管理删除
  public deleteWelladd(body): Observable<any> {
    return this.http.post('', body, {
      headers: this.headers
    });
  }
  // 井管理修改
  public updateWelladd(body): Observable<any> {
    return this.http.post('', body, {
      headers: this.headers
    });
  }
}
