import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpOwnerSignUpPage } from './pump-owner-sign-up';

@NgModule({
  declarations: [
    PumpOwnerSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpOwnerSignUpPage),
  ],
  exports: [
    PumpOwnerSignUpPage
  ]
})
export class PumpOwnerSignUpModule {}
