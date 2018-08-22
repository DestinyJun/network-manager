import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavList, NavListChild} from '../../shared/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output()
  public BL: EventEmitter<boolean> =  new EventEmitter();
  public navLists: NavList[] = [
    new NavList('首页', 'main', 'fa fa-laptop', true, [] , true),
    new NavList('用户管理', 'users', 'fa fa-user', false, [] , true),
    new NavList('井管理', '', 'fa fa-cog fa-spin', false, [
      new NavListChild('基本信息添加', false, 'well/wellBaseAdd'),
      new NavListChild('详情信息添加', false, 'well/welladd'),
      new NavListChild('基本信息(表)', false, 'well/wellinfo'),
      new NavListChild('详情信息(单个井)', false, 'well/wellDetailInfo'),
      new NavListChild('修改井', false, 'well/wellmodify'),
    ] , true),
    new NavList('维修管理', '', 'fa fa-refresh', false, [] , true),
    new NavList('历史详情', '', 'fa fa-history', false, [] , true),
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(
    private router: Router,
    ) {}
  ngOnInit() {
  }
  onMouseleave() {
    this.slidingTop = -120;
  }
  mainLiMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  mainLiClick(mainul, element, list) {
    if (list.children.length === 0) {
      this.BL.emit(true);
    }
    if (list.routers) {
      this.router.navigate(['/home/' + list.routers]);
    }
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
      // this.router.navigate(['/home']);
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      this.navLists.forEach((item) => {
        item.open = true;
        item.clsstate = false;
        // if (item.children) {
        //   console.log('hello');
        // }
        item.children.forEach((itemchild) => {
          itemchild.setState = false;
        });
      });
      list.clsstate = true;
      return;
    }
    if (element.offsetHeight === 0) {
      this.navLists.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 40;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    } else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }
  }
  menuliMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  menuliClick(element) {
    this.navLists.forEach((item) => {
      item.clsstate = false;
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    if (!element.setState) {
      this.BL.emit(true);
    }
    element.setState = true;
  }
}
