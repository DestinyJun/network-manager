import { Injectable } from '@angular/core';

@Injectable()
export class CommonfunService {
  private GG: string;
  constructor() { }
  public setGG(value: string): void {
    this.GG = value;
  }
  public getGG(): string {
    return this.GG;
  }
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
