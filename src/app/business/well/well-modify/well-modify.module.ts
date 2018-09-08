import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellModifyRoutingModule } from './well-modify-routing.module';
import { WellModifyComponent } from './well-modify.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseModule} from '../../../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    WellModifyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BaseModule
  ],
  declarations: [WellModifyComponent]
})
export class WellModifyModule { }
