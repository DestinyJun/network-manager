import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellInformationRoutingModule } from './well-information-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WellInformationComponent} from './well-information.component';

@NgModule({
  imports: [
    CommonModule,
    WellInformationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WellInformationComponent
  ]
})
export class WellInformationModule { }
