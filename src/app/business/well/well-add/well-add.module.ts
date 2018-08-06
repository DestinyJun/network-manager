import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellAddRoutingModule } from './well-add-routing.module';
import { WellAddComponent } from './well-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WellEnterInfoComponent } from './well-enter-info/well-enter-info.component';
import { WellOutInfoComponent } from './well-out-info/well-out-info.component';
import { WellSensorInfoComponent } from './well-sensor-info/well-sensor-info.component';
import {WellCoverComponent} from './well-cover/well-cover.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    WellAddRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    WellAddComponent,
    WellCoverComponent,
    WellEnterInfoComponent,
    WellOutInfoComponent,
    WellSensorInfoComponent
  ]
})
export class WellAddModule { }
