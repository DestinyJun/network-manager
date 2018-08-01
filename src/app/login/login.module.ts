import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutersModule} from './login.routers.module';
import {LoginComponent} from './login.component';
import {CustomFormsModule} from 'ng4-validators';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutersModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule {}
