import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GlobalService {
  public sessionStorage: any;

  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.sessionStorage = sessionStorage;
  }

  public set(key: string, value: string): void {
    this.sessionStorage[key] = value;
  }

  public get(key: string): string {
    return this.sessionStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.sessionStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(key);
  }
}
// 分页类
export class UsePageQuery {
  constructor(
    public currentPage: number,
    public pageSize: number,
    public provinceRegionId: string,
    public cityRegionId: string,
    public countyRegionId: string,
    public townRegionId: string,
  ) {}
}
// 井盖信息类
export class ManholeCoverInfo {
  constructor(public id: string, // 井id
              public manholeId: string, //井Id
              public provinceRegionId: string, //省地区id
              public cityRegionId: string, //市地区Id
              public countyRegionId: string, //（县/区）地区Id
              public townRegionId: string, //（镇或者乡）地区Id
              public sensorsize: string, //传感器个数
              public material: string, //材质
              public gpsPosition: string, //地址
              public dataCollectorId: string, //数据收集器id
              public creatTime: string, //创建时间
              public gpsId: string, //gps坐标
  ) {
  }
}

// 进井类
export class InFlowManhole {
  constructor(public manholeId: string,
              public inFlowRelationId: string,
              public inFlowPipeId: string,
              public inFlowPipeRadius: string,
              public inFlowPipeSlope: string,
              public inFlowPipeLength: string) {
  }
}

// 出井类
export class FlowOutManhole {
  constructor(public manholeId: string,
              public flowOutRelationId: string,
              public flowOutPipeId: string,
              public flowOutPipeRadius: string,
              public flowOutPipeSlope: string,
              public flowOutPipeLength: string) {
  }
}

// 监控器信息类
export class SensorInfo {
  constructor(
    public initialManholeId: string, //井i: string,
    public sensormode: string, //传感器所属模式
    public modeId: string, //模块id
    public hight: string, //高度
    public modePlace: string, //传感器在模块中的位置
    public conduitId: string, //导管id
    public dataCollectorId: string //数据收集器id
  ) {
  }
}

// 表单类
export class FormHtml {
  constructor(
    public name: string,
    public content: string,
    public valids: Array<Array<any>>
  ) {
  }
}

// 分页类
export class PageBody {
  constructor(
              public page: number,
              public row: number
  ) {
  }
}

// 用户分页查询类
export class queryUserInfo {
  constructor(public roleId: string, //g角色
              public currentPage: number, //查看的当前页
              public pageSize: number, //每页大小
              public provinceRegionId: string, //g省地区Id
              public cityRegionId: string, //g市地区Id
              public countyRegionId: string, //（县/区）地区Id
              public townRegionId: string //（镇/乡）地区
  ) {
  }
}

// 用户管理类
export class UsersManager {
  constructor(public id: string,
              public userCode: string,
              public idCode: string,
              public realName: string,
              public userName: string,
              public homeAddress: string,
              public homeTelephone: string,
              public organizationId: string,
              public password: string,
              public phone: string,
              public email: string,
              public birthday: string,
              public gender: string,
              public idt: string,
              public udt: string,
              public sysids: string) {
  }
}

// 导航菜单类
export class NavList {
  constructor(public title: string,
              public routers: string,
              public icon: string,
              public clsstate: boolean,
              public children: NavListChild[],
              public open: boolean) {
  }
}

// 导航子菜单类
export class NavListChild {
  constructor(public title: string,
              public setState: boolean,
              public routers: string) {
  }
}

// 用户类
export class UserInfo {
  private http: HttpClient;

  constructor(public idCardNo: string, //身份证号码
              public username: string, //账号
              public password: string, //密码
              public gender: string, //用户性别
              public age: number, //用户年纪
              public phone: string, //用户电话
              public address: string, //用户住址
              public name: string, //姓名
              public locked: string, //账号是否锁定，1：锁定，0未锁定
              public roleId: Array<string>, //角色id
              public provinceRegionId: string, //省地区id
              public cityRegionId: string, //市地区Id
              public countyRegionId: string, //（县/区）地区Id
              public townRegionId: string, //（镇或者乡）地区Id
              public managementArea: string, //管辖地区名称
  ) {
  }
}
