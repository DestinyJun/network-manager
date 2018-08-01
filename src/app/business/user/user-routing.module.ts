import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellComponent} from '../well/well.component';
import {WellAddComponent} from '../well/well-add/well-add.component';
import {UserComponent} from './user.component';
import {UsersAddComponent} from './users-add/users-add.component';

const routes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path: 'users-add', component: UsersAddComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
