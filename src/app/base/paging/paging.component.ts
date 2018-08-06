import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReqService} from '../../shared/req.service';
import {PageBody, UsePageQuery} from '../../shared/global.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input()
  public pageBody: UsePageQuery;
  @Output()
  public pageBodyChange: EventEmitter<UsePageQuery> = new EventEmitter;
  @Input()
  public num: number;
  public nowPage: number;
  public skpPage: string;
  constructor(
    public req: ReqService,
  ) {
    this.skpPage = '1';
    this.pageBody = new UsePageQuery(1, 10, '', '', '', '');
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
