import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Databaseservice } from "../../providers/databaseservice";
// import { RequestAppointmentPage } from '../request-appointment/request-appointment';
import { List } from "../list/list";
import { Map } from "../map/map";

// import { PumpDetails } from '../pump-details/pump-details';

/**
 * Generated class for the PumpList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pump-list',
  templateUrl: 'pump-list.html',
})
export class PumpListPage  {
  tab1Root: any = Map;
  tab2Root: any = List;
  items: any;
  constructor(public navCtrl: NavController, public db: Databaseservice) {
  this.items = this.db.PumpList();
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumpList');
  }


}
