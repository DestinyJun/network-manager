import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', loadChildren: 'app/business/main/main.module#MainModule'},
      {path: 'well', loadChildren: 'app/business/well/well.module#WellModule'},
      {path: 'users', loadChildren: 'app/business/users/users.module#UsersModule'},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutersModule {}
