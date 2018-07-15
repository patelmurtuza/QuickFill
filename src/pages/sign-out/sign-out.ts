import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home'
/**
 * Generated class for the SignOutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html',
})
export class SignOutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public storage:Storage) {
    storage.clear()
    ;
    storage.remove("LoggedInUser");
    storage.remove("LoggedInUserKey");
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignOutPage');
  }

}
