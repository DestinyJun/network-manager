import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersAddComponent} from './users-add.component';

const routes: Routes = [
  {path: '', component: UsersAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAddRoutingModule { }
