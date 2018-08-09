import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PagingUserComponent} from './paging-user/paging-user.component';
import {PagingWellComponent} from './paging-well/paging-well.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    PagingUserComponent,
    PagingWellComponent
  ],
  exports: [
    PagingUserComponent,
    PagingWellComponent
  ]
})
export class BaseModule { }
