import { Component, OnInit } from '@angular/core';
import {ReqService} from '../../../shared/req.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-well-delete',
  templateUrl: './well-delete.component.html',
  styleUrls: ['./well-delete.component.css']
})
export class WellDeleteComponent implements OnInit {
  protected backUrl: string;
  protected controlBackBtn = true;
  public wellId: string;
  constructor(
    private req: ReqService,
    private routerInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((data) => {
      if (data.id) {
        this.wellId = data.id;
        this.backUrl = data.parentUrl;
        this.controlBackBtn = true;
      }
    });
  }
  public delete(id: string): void {
    this.req.deleteWell({manholeId: this.wellId}).then(res => {
      console.log(res);
    });
  }

}
