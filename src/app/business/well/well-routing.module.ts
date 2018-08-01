import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellComponent} from './well.component';
import {WellAddComponent} from './well-add/well-add.component';
import {WellInformationComponent} from './well-information/well-information.component';

const routes: Routes = [
  {path: '', component: WellComponent,
    children: [
      {path: 'well-information', component: WellInformationComponent},
      {path: 'well-add', component: WellAddComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellRoutingModule { }
