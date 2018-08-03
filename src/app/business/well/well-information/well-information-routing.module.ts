import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellInformationComponent} from './well-information.component';

const routes: Routes = [
  {path: '', component: WellInformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellInformationRoutingModule { }
