import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellDetailInfoRoutingModule } from './well-detail-info-routing.module';
import { WellDetailInfoComponent } from './well-detail-info.component';

@NgModule({
  imports: [
    CommonModule,
    WellDetailInfoRoutingModule
  ],
  declarations: [WellDetailInfoComponent]
})
export class WellDetailInfoModule { }
