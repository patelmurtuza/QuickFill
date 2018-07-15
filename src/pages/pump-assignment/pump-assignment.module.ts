import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpAssignmentPage } from './pump-assignment';

@NgModule({
  declarations: [
    PumpAssignmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpAssignmentPage),
  ],
  exports: [
    PumpAssignmentPage
  ]
})
export class PumpAssignmentModule {}
