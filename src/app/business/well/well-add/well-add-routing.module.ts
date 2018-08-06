import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellAddComponent} from './well-add.component';
import {WellEnterInfoComponent} from './well-enter-info/well-enter-info.component';
import {WellOutInfoComponent} from './well-out-info/well-out-info.component';
import {WellSensorInfoComponent} from './well-sensor-info/well-sensor-info.component';
import {WellCoverComponent} from './well-cover/well-cover.component';

const routes: Routes = [
  {path: '', component: WellAddComponent,
    children: [
      {path: 'cover', component: WellCoverComponent},
      {path: 'enter', component: WellEnterInfoComponent},
      {path: 'out', component: WellOutInfoComponent},
      {path: 'sensor', component: WellSensorInfoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellAddRoutingModule { }
