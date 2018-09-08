import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellDeleteRoutingModule } from './well-delete-routing.module';
import {WellDeleteComponent} from './well-delete.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WellDeleteRoutingModule,
    FormsModule
  ],
  declarations: [
    WellDeleteComponent
  ]
})
export class WellDeleteModule { }
