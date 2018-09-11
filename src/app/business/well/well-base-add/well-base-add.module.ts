import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellBaseAddRoutingModule } from './well-base-add-routing.module';
import { WellBaseAddComponent } from './well-base-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseModule} from '../../../base/base.module';
import {ValidatorsModule} from 'ngx-validators';

@NgModule({
  imports: [
    CommonModule,
    WellBaseAddRoutingModule,
    FormsModule,
    BaseModule,
    ReactiveFormsModule,
    ValidatorsModule
  ],
  declarations: [
    WellBaseAddComponent
  ]
})
export class WellBaseAddModule { }
