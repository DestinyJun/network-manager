import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellDeleteComponent} from './well-delete.component';

const routes: Routes = [
  {path: '', component: WellDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellDeleteRoutingModule { }
