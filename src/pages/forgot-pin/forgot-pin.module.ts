import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPin } from './forgot-pin';

@NgModule({
  declarations: [
    ForgotPin,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPin),
  ],
  exports: [
    ForgotPin
  ]
})
export class ForgotPinModule {}
