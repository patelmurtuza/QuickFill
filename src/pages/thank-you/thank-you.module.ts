import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankYou } from './thank-you';

@NgModule({
  declarations: [
    ThankYou,
  ],
  imports: [
    IonicPageModule.forChild(ThankYou),
  ],
  exports: [
    ThankYou
  ]
})
export class ThankYouModule {}
