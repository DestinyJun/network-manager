import { NgModule } from '@angular/core';
import {PagingComponent} from './paging/paging.component';
import {FormsModule} from '@angular/forms';
import {RegionComponent} from './region/region.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    PagingComponent,
    RegionComponent
  ],
  exports: [
    PagingComponent,
    RegionComponent
  ]
})
export class BaseModule { }
