import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpQueuePage } from './pump-queue';

@NgModule({
  declarations: [
    PumpQueuePage,
  ],
  imports: [
    IonicPageModule.forChild(PumpQueuePage),
  ],
  exports: [
    PumpQueuePage
  ]
})
export class PumpQueueModule {}
