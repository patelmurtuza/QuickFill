import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpListPage } from './pump-list';

@NgModule({
  declarations: [
    PumpListPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpListPage),
  ],
  exports: [
    PumpListPage
  ]
})
export class PumpListModule {}
