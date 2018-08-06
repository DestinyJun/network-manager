import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellComponent} from './well.component';

const routes: Routes = [
  {path: '', component: WellComponent,
    children: [
      {path: 'welladd', loadChildren: 'app/business/well/well-add/well-add.module#WellAddModule'},
      // {path: 'welladd', component: WellAddComponent},
      {path: 'wellinfo', loadChildren: 'app/business/well/well-information/well-information.module#WellInformationModule'},
      {path: 'well-information', loadChildren: ''},
      {path: 'well-add', loadChildren: 'app/business/well/well-add/well-add.module#WellAddModule'},
      {path: 'well-information', loadChildren: 'app/business/well/well-information/well-information.module#WellInformationModule'},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WellRoutingModule { }
