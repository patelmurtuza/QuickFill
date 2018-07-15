import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestAppointmentPage } from './request-appointment';

@NgModule({
  declarations: [
    RequestAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestAppointmentPage),
  ],
  exports: [
    RequestAppointmentPage
  ]
})
export class RequestAppointmentModule {}
