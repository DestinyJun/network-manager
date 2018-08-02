import { Injectable } from '@angular/core';

@Injectable()
export class CommonfunService {

  constructor() { }

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

}
