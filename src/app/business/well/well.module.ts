import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellRoutingModule } from './well-routing.module';
import { WellComponent } from './well.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng4-validators';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {WellAddComponent} from './well-add/well-add.component';
import { WellInformationComponent } from './well-information/well-information.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WellRoutingModule,
    ModalModule.forRoot(),
    PaginationModule,
    CustomFormsModule,
    CommonModule,
    WellRoutingModule
  ],
  declarations: [
    WellComponent,
    WellAddComponent,
    WellInformationComponent
  ]
})
export class WellModule { }
