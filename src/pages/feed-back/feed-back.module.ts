import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedBack } from './feed-back';

@NgModule({
  declarations: [
    FeedBack,
  ],
  imports: [
    IonicPageModule.forChild(FeedBack),
  ],
  exports: [
    FeedBack
  ]
})
export class FeedBackModule {}
