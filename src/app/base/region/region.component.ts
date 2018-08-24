import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {GlobalService} from '../../shared/global.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit, OnChanges {
  public provinces: any;
  public cities: any;
  public counties: any;
  public towns: any;
  @Input()
  private regionInfo = {
    provinceRegionId: null,
    cityRegionId: null,
    countyRegionId: null,
    townRegionId: null
  };
  @Output()
  public regionInfoChange = new EventEmitter();
  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    const region = this.globalService.getRegion();
    this.provinces = region;
  }
  // 只要检测到regionInfo数据改变，就会发送最新的值给父元素
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.regionInfo);
    this.regionInfoChange.emit(this.regionInfo);
  }
  /**
   * 改变查询条件，添加按位置来查询
   * */
  // 选择省
  public selProvince(value: string): void {
    this.regionInfo.provinceRegionId = value;
    this.cities = [];
    this.counties = [];
    this.towns = [];
    this.provinces.forEach(pro => {
      if (pro.provinceRegionId === value) {
        if (pro['cityList']) {
          this.cities = pro['cityList'];
        }
      }
    });
    this.regionInfoChange.emit(this.regionInfo);
  }
  // 选择市
  public selCity(value): void {
    this.regionInfo.cityRegionId = value;
    this.counties = [];
    this.towns = [];
    this.cities.forEach(city => {
      if (city.provinceRegionId === value) {
        if (city['countyList']) {
          this.counties = city['countyList'];
        }
      }
    });
    this.regionInfoChange.emit(this.regionInfo);
  }
  // 选择县
  public selCounty(value): void {
    this.regionInfo.countyRegionId = value;
    this.towns = [];
    this.cities.forEach(city => {
      if (city.provinceRegionId === value) {
        if (city['townList']) {
          this.towns = city['townList'];
        }
      }
    });
    this.regionInfoChange.emit(this.regionInfo);
  }
  // 选择乡
  public selTown(value): void {
    this.regionInfo.townRegionId = value;
    this.regionInfoChange.emit(this.regionInfo);
  }

}
