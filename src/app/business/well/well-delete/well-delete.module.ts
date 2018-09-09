import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellDeleteRoutingModule } from './well-delete-routing.module';
import {WellDeleteComponent} from './well-delete.component';
import {FormsModule} from '@angular/forms';
import {BaseModule} from '../../../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    WellDeleteRoutingModule,
    FormsModule,
    BaseModule
  ],
  declarations: [
    WellDeleteComponent
  ]
})
export class WellDeleteModule { }
