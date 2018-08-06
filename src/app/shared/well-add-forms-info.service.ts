import { Injectable } from '@angular/core';

@Injectable()
export class WellAddFormsInfoService {
  // validCurrentForm, 值为 true 时，表示当添加模块中有 无效的表单。注意是该添加下验证所有表单。
  private validCurrentFormValue: boolean;
  public wellInfo = {
    manholeCoverInfo: null,
    inFlowManholelist: [],
    flowOutManholelist: [],
    sensorInfoList: []
  };
  constructor() {}
  /**********************************************************************/
  // 设置和获取validCurrentForm
  public setValidCurrentFormValue(value: boolean): void {
    this.validCurrentFormValue = value;
  }
  public getValidCurrentFormValue(): boolean {
    if (this.validCurrentFormValue) {
      return this.validCurrentFormValue;
    }else {
      return null;
    }
  }
  /**********************************************************************/
  // 清空 manholeCoverInfo
  public cleanWellCoverFormsInfo(): void {
    this.wellInfo.manholeCoverInfo = [];
  }
  // 设置和获取井盖数据
  public setWellCoverFormsInfo(value: any): void {
    this.wellInfo.manholeCoverInfo.push(value);
  }
  /**********************************************************************/
  // 清空 inFlowManholelist
  public cleanEnterWellFormsInfo(): void {
    this.wellInfo.inFlowManholelist = [];
  }
  // 设置和获取进井数据
  public setEnterWellFormsInfo(value: any): void {
    this.wellInfo.inFlowManholelist.push(value);
  }
  // public getEnterWellFormsInfo(value: any): void {
  //   this.wellInfo.inFlowManholelist.push(value);
  // }
  /**********************************************************************/
  // 清空 flowOutManholelist
  public cleanOutWellFormsInfo(): void {
    this.wellInfo.inFlowManholelist = [];
  }
  // 设置和获取出井数据
  public setOutWellFormsInfo(value: any): void {
    this.wellInfo.flowOutManholelist.push(value);
  }
  // public getOutWellFormsInfo(): void {
  //   this.wellInfo.flowOutManholelist.push(value);
  // }
  /**********************************************************************/
  // 清空 sensorInfoList
  public cleanSensorWellFormsInfo(): void {
    this.wellInfo.sensorInfoList = [];
  }
  // 设置和获取井的传感器数据
  public setSensorWellFormsInfo(value: any): void {
    this.wellInfo.sensorInfoList.push(value);
  }
  // public getSensorWellFormsInfo(value: any): void {
  //   this.wellInfo.sensorInfoList.push(value);
  // }
  /**********************************************************************/
  // 获取井最后的信息
  public getWellAllInfo(): any {
    return this.wellInfo;
  }
}
