import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellDeleteRoutingModule } from './well-delete-routing.module';
import {WellDeleteComponent} from './well-delete.component';

@NgModule({
  imports: [
    CommonModule,
    WellDeleteRoutingModule
  ],
  declarations: [
    WellDeleteComponent
  ]
})
export class WellDeleteModule { }
