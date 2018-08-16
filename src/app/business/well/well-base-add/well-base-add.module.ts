import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellBaseAddRoutingModule } from './well-base-add-routing.module';
import { WellBaseAddComponent } from './well-base-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WellBaseAddRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WellBaseAddComponent
  ]
})
export class WellBaseAddModule { }
