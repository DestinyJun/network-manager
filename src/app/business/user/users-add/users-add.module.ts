import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAddRoutingModule } from './users-add-routing.module';
import { UsersAddComponent } from './users-add.component';

@NgModule({
  imports: [
    CommonModule,
    UsersAddRoutingModule
  ],
  declarations: [UsersAddComponent]
})
export class UsersAddModule { }
