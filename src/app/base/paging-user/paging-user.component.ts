import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsePageQueryUser} from '../../shared/global.service';
import {ReqService} from '../../shared/req.service';

@Component({
  selector: 'app-paging-user',
  templateUrl: './paging-user.component.html',
  styleUrls: ['./paging-user.component.css']
})
export class PagingUserComponent implements OnInit {
  @Input()
  public pageBody: UsePageQueryUser;
  @Output()
  public pageBodyChange: EventEmitter<UsePageQueryUser> = new EventEmitter;
  @Input()
  public num: number;
  public nowPage: number;
  public skpPage: string;
  constructor(
    public req: ReqService,
  ) {
    this.skpPage = '1';
    this.pageBody = new UsePageQueryUser('', 1, 10, '', '', '', '');
    this.nowPage = this.pageBody.currentPage;
  }
  ngOnInit() {
  }

  //  首页页
  public firstPage(): void {
    this.pageBody.currentPage = 1;
    this.nowPage = 1;
    this.pageBodyChange.emit(this.pageBody);
  }

//  上一页
  public previousPage(): void {
    if (this.pageBody.currentPage <= 1) {
      alert('已经到达首页');
    } else {
      this.pageBody.currentPage -= 1;
      this.nowPage = this.pageBody.currentPage;
      this.pageBodyChange.emit(this.pageBody);
    }
  }

//  下一页
  public nextPage(): void {
    if (this.pageBody.currentPage >= this.num) {
      alert('已经到达尾页');
    } else {
      this.pageBody.currentPage += 1;
      this.nowPage = this.pageBody.currentPage;
      this.pageBodyChange.emit(this.pageBody);
    }
  }

  // 尾页
  public lastPage(): void {
    this.pageBody.currentPage = this.num;
    this.nowPage = this.pageBody.currentPage;
    this.pageBodyChange.emit(this.pageBody);
  }

  // 指定跳转页
  public appointPage(event): void {
    if (event.keyCode === 13 || event.type === 'click') {
      if (Number(this.skpPage) > this.num || Number(this.skpPage) <= 0 || this.skpPage === null) {
        alert('你的输入超过最大页数或格式有误');
      } else {
        this.pageBody.currentPage = Number(this.skpPage);
        this.nowPage = Number(this.skpPage);
        this.pageBodyChange.emit(this.pageBody);
      }
    }
  }
}
