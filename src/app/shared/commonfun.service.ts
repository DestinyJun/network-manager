import { Injectable } from '@angular/core';

@Injectable()
export class CommonfunService {
  constructor() {}
  // 序例化
  public serialize(value: Object): string {
    let result: string;
    for (const i in value) {
      if (result) {
        result += '&' + i + '=' + value[i];
      }else {
        result = i + '=' + value[i];
      }
    }
    return result;
  }
  // 判断变量或对象是不是为有效值
  public judgeVarOrObjectIsValid(value: any): boolean {
    const type = typeof value;
    if (value === '') {
      return null;
    }else if (value === null) {
      return null;
    }else if (value === NaN) {
      return null;
    }else if (value === undefined) {
      return null;
    }else if (type === 'object') {
      if (value.length === 0) {
        return null;
      }else if (JSON.stringify(value) === JSON.stringify({})) {
        return null;
      }else {
        return value;
      }
    }
  }
}
