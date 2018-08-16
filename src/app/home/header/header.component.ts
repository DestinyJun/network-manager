import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReqService} from '../../shared/req.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {GlobalService, PersonInfo} from '../../shared/global.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sendFoldValueChange: EventEmitter<boolean> = new EventEmitter();
  private sendFoldValue: boolean;
  constructor(
    private req: ReqService
  ) {}
  ngOnInit(): void {
    this.sendFoldValue = false;
  }
  public foldMenu(): void {
    this.sendFoldValueChange.emit(this.sendFoldValue);
    this.sendFoldValue = !this.sendFoldValue;
  }
  public logout(): void {
    this.req.Logout().subscribe(value => {console.log(value); });
  }
}
export class UserRemind {
  constructor(
    public classFlag: string,
    public userPhoto: string,
    public userMessage: string,
    public userTime: Date
  ) {}
}

