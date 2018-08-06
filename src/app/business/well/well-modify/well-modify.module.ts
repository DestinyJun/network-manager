import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellModifyRoutingModule } from './well-modify-routing.module';
import { WellModifyComponent } from './well-modify.component';

@NgModule({
  imports: [
    CommonModule,
    WellModifyRoutingModule
  ],
  declarations: [WellModifyComponent]
})
export class WellModifyModule { }
