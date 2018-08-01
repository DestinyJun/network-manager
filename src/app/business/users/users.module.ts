import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutersModule} from './users .routers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutersModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [],
})
export class  UsersModule { }
