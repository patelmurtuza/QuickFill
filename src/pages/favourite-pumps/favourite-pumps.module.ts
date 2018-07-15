import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritePumpsPage } from './favourite-pumps';

@NgModule({
  declarations: [
    FavouritePumpsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritePumpsPage),
  ],
  exports: [
    FavouritePumpsPage
  ]
})
export class FavouritePumpsModule {}
