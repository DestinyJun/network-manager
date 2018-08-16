import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellAddRoutingModule } from './well-add-routing.module';
import { WellAddComponent } from './well-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    WellAddRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    WellAddComponent
  ]
})
export class WellAddModule { }
