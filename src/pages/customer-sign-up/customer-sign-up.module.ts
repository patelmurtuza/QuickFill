import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerSignUpPage } from './customer-sign-up';

@NgModule({
  declarations: [
    CustomerSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSignUpPage),
  ],
  exports: [
    CustomerSignUpPage
  ]
})
export class CustomerSignUpPageModule {}
