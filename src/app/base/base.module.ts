import { NgModule } from '@angular/core';
import {PagingComponent} from './paging/paging.component';
import {FormsModule} from '@angular/forms';
import {RegionComponent} from './region/region.component';
import {CommonModule} from '@angular/common';
import { HintMsgComponent } from './hint-msg/hint-msg.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    PagingComponent,
    RegionComponent,
    HintMsgComponent
  ],
  exports: [
    PagingComponent,
    RegionComponent,
    HintMsgComponent
  ]
})
export class BaseModule { }
