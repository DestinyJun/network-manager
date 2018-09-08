import { Component, OnInit } from '@angular/core';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-well-delete',
  templateUrl: './well-delete.component.html',
  styleUrls: ['./well-delete.component.css']
})
export class WellDeleteComponent implements OnInit {

  constructor(
    private req: ReqService
  ) { }

  ngOnInit() {
  }
  public delete(id: string): void {
    this.req.deleteWell({manholeId: id}).then(res => {
      console.log(res);
    });
  }

}
