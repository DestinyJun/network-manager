import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellModifyComponent} from './well-modify.component';

const routes: Routes = [
  {path: '', component: WellModifyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellModifyRoutingModule { }
