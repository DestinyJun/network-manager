import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellBaseAddComponent} from './well-base-add.component';

const routes: Routes = [
  {path: '', component: WellBaseAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellBaseAddRoutingModule { }
