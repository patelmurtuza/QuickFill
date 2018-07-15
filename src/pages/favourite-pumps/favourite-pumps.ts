import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Databaseservice } from "../../providers/databaseservice";
import { Storage } from '@ionic/storage';
import { BaseComponent } from '../basecomponent';
import { PumpDetails } from '../pump-details/pump-details';
import { PumpListPage } from '../pump-list/pump-list';
import { Geolocation } from '@ionic-native/geolocation';
import { RequestAppointmentPage } from '../request-appointment/request-appointment';
import { Map } from '../map/map';
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-favourite-pumps',
  templateUrl: 'favourite-pumps.html',
})
export class FavouritePumpsPage extends BaseComponent {
  favouriteList: Array<any>;
  userCurrentLat: number;
  userCurrentLng: number;
  isUserLoggedIn: boolean = false;
  favouritePresent: boolean = false;
  constructor(public geolocation: Geolocation,
    public storage: Storage,
    public navCtrl: NavController,
    public db: Databaseservice) {

    super();
    storage.get('LoggedInUserKey').then((val) => {
      let userNodeKey = val;
      this.isUserLoggedIn = true;
      geolocation.getCurrentPosition().then((position) => {
        this.userCurrentLng = position.coords.latitude;
        this.userCurrentLng = position.coords.longitude
      });
      this.db.getFavouriteList(userNodeKey).subscribe(snapshots => {
        this.favouriteList = new Array();
        snapshots.forEach(snapshot => {
          this.favouriteList.push({
            'PumpName': snapshot.PumpName, "PumpLatitude": snapshot.CurrentLatitude,
            "PumpLongitude": snapshot.CurrentLongitude, "PumpCompany": snapshot.PumpCompany,
            "PumpAddress": snapshot.PumpAddress, "PumpCity": snapshot.PumpCity,
            "Distance": this.applyHaversine(this.userCurrentLng, this.userCurrentLng,
              snapshot.CurrentLatitude, snapshot.CurrentLongitude)
          });
        });
        if (this.favouriteList.length > 0)
          this.favouritePresent = true;
      });
    });
  }
  itemTapped(pumpName: string) {
    for (let i = 0; i < this.favouriteList.length; i++) {
      if (this.favouriteList[i].PumpName == pumpName) {
        this.navCtrl.push(PumpDetails, this.favouriteList[i]);
        break;
      }
    }
  }
  goToMap(selectedpump) {
    this.navCtrl.push(Map, selectedpump);
  }
  bookAppointment(selectedPumpName) {
    this.navCtrl.push(RequestAppointmentPage, selectedPumpName);
  }
  gotoPumplist() {
    this.navCtrl.push(PumpListPage);
  }
}
