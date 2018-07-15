import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FillingHistoryPage } from './filling-history';

@NgModule({
  declarations: [
    FillingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(FillingHistoryPage),
  ],
  exports: [
    FillingHistoryPage
  ]
})
export class FillingHistoryModule {}
