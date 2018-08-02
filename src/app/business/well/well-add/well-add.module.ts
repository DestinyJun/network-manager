import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellAddRoutingModule } from './well-add-routing.module';
import { WellAddComponent } from './well-add.component';
import {FormGroup} from '@angular/forms';
import { WellEnterInfoComponent } from './well-enter-info/well-enter-info.component';
import { WellOutInfoComponent } from './well-out-info/well-out-info.component';
import { WellSensorInfoComponent } from './well-sensor-info/well-sensor-info.component';

@NgModule({
  imports: [
    CommonModule,
    WellAddRoutingModule,
    FormGroup
  ],
  declarations: [WellAddComponent, WellEnterInfoComponent, WellOutInfoComponent, WellSensorInfoComponent]
})
export class WellAddModule { }
