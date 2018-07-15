import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Databaseservice } from "../../providers/databaseservice";

/**
 * Generated class for the ThankYou page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-thank-you',
    templateUrl: 'thank-you.html',
})
export class ThankYou {
    items: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: Databaseservice) {
        this.items = db.requestAppointment();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ThankYou');
    }

}
