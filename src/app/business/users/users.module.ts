import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutersModule} from './users .routers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BaseModule} from '../../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutersModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BaseModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [],
})
export class  UsersModule { }
