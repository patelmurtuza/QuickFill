import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder } from "@angular/forms";
/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
myResetForm:FormGroup;
  resetInfo: {opin: string, npin: string,ncpin: string} 
  ={opin: '',npin:'',ncpin: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder) {
  }
ngOnInit():any{
  this.myResetForm=this.fb.group({
opin:'',
npin:'',
ncpin:''
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPassword');
  }

}
