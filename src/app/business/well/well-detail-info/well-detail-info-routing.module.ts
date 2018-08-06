import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellDetailInfoComponent} from './well-detail-info.component';

const routes: Routes = [
  {path: '', component: WellDetailInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellDetailInfoRoutingModule { }
