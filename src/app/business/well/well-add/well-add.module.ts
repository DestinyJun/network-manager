import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellAddRoutingModule } from './well-add-routing.module';
import { WellAddComponent } from './well-add.component';
import {FormGroup} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WellAddRoutingModule,
    FormGroup
  ],
  declarations: [WellAddComponent]
})
export class WellAddModule { }
