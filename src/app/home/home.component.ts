import {Component, DoCheck, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy, DoCheck {
  public parentFoldValue: boolean;
  constructor(
    private localSessionStorage: GlobalService,
    private req: ReqService,
    public router: Router
  ) {
  }
  ngDoCheck(): void {
  }
  ngOnInit() {
    console.log(sessionStorage.getItem('region'));
    this.parentFoldValue = true;
  }
  public rejectFoldValue(e): void {
    this.parentFoldValue = e;
  }

  public ngOnDestroy(): void {

  }

}
