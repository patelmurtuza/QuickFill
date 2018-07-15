import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpDetails } from './pump-details';

@NgModule({
  declarations: [
    PumpDetails,
  ],
  imports: [
    IonicPageModule.forChild(PumpDetails),
  ],
  exports: [
    PumpDetails
  ]
})
export class PumpDetailsModule {}
