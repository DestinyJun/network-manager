import { NgModule } from '@angular/core';
import {PagingComponent} from './paging/paging.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    PagingComponent
  ],
  exports: [PagingComponent]
})
export class BaseModule { }
