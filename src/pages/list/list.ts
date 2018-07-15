import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Databaseservice } from "../../providers/databaseservice";
import 'rxjs/add/operator/map';
import { PumpDetails } from '../pump-details/pump-details';
import { BaseComponent } from '../basecomponent';
import { Geolocation } from '@ionic-native/geolocation';
import { RequestAppointmentPage } from '../request-appointment/request-appointment';
import { Map } from '../map/map';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class List extends BaseComponent {
  pumpList: Array<any>;
  filteredPumpsList = [];
  lat: number;
  lng: number;
  queryText: string='';
  updateList:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: Databaseservice, public geolocation: Geolocation) {
    super();
    geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude
      this.db.PumpList().subscribe(snapshots => {
        this.pumpList = new Array();
        snapshots.forEach(
          snapshot => {
            this.pumpList.push({
              "PumpName": snapshot.PumpName, "PumpCompany": snapshot.PumpCompany, "PumpAddress": snapshot.PumpAddress, "PumpLatitude": snapshot.PumpLatitude,
              "PumpCity": snapshot.PumpCity, "PumpLongitude": snapshot.PumpLongitude, "Distance": this.applyHaversine(this.lat, this.lng, snapshot.PumpLatitude, snapshot.PumpLongitude)
            });
          }
        );
        this.pumpList.sort(this.GetSortOrder("Distance"));
      });
    });


  }
  goToMap(selectedpump) {
    this.navCtrl.push(Map, selectedpump);
  }

  itemTapped(pump) {
    let i = 0;
    for (i = 0; i < this.pumpList.length; i++) {
      if (this.pumpList[i].PumpName == pump) {
        this.navCtrl.push(PumpDetails, this.pumpList[i]);
        break;
      }
    }
  }

  bookAppointment(selectedPumpName) {
    this.navCtrl.push(RequestAppointmentPage, selectedPumpName);
  }
  updatePumpList() {
    this.updateList=true;
    let i = 0;
    this.filteredPumpsList=new Array();
    for (i = 0; i < this.pumpList.length; i++) {
      this.filteredPumpsList.push({
        "PumpName": this.pumpList[i].PumpName,
        "PumpCompany": this.pumpList[i].PumpCompany,
        "PumpAddress": this.pumpList[i].PumpAddress,
        "PumpLatitude": this.pumpList[i].PumpLatitude,
        "PumpCity": this.pumpList[i].PumpCity,
        "PumpLongitude": this.pumpList[i].PumpLongitude,
        "Distance": this.pumpList[i].Distance
      })
    }
    //let val=ev.target.value
    this.filteredPumpsList = this.filteredPumpsList.filter((item) => {
      return item.PumpName.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;
    });

  }
}

