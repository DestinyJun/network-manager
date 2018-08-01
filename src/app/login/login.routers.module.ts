import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login.component';
import {HomeComponent} from '../home/home.component';
const loginRoutes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutersModule {}
