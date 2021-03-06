import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellComponent} from './well.component';

const routes: Routes = [
  {path: '', component: WellComponent,
    children: [
      {path: 'wellBaseAdd', loadChildren: 'app/business/well/well-base-add/well-base-add.module#WellBaseAddModule'},
      {path: 'welladd', loadChildren: 'app/business/well/well-add/well-add.module#WellAddModule'},
      {path: 'welldelete', loadChildren: 'app/business/well/well-delete/well-delete.module#WellDeleteModule'},
      {path: 'wellinfo', loadChildren: 'app/business/well/well-information/well-information.module#WellInformationModule'},
      {path: 'wellDetailInfo', loadChildren: 'app/business/well/well-detail-info/well-detail-info.module#WellDetailInfoModule'},
      {path: 'wellmodify', loadChildren: 'app/business/well/well-modify/well-modify.module#WellModifyModule'},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WellRoutingModule { }
