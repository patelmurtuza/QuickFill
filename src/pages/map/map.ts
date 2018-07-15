import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Databaseservice } from "../../providers/databaseservice";
import { BaseComponent } from '../basecomponent';
import { DirectionsMapDirective } from "../../directives/maproute";
import { LocationTracker } from '../../providers/location-tracker';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [GoogleMapsAPIWrapper]
})

export class Map extends BaseComponent {
  image: string = "assets/icon/currenticon.png";
  imageCar: string = "assets/icon/caricon.png";
  imagePump: string = "assets/icon/pumpicon.png"
  map: any;
  lat: number = 0;
  lng: number = 0;
  markerLabel: string;
  estimatedDistance: any;
  estimatedTime: any;
  selectedPump: SelectedPump = new SelectedPump();
  isPumpSelected: boolean = false;
  showHeader: boolean = false;
  pumpData: any;
  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  public origin: markerDetail = new markerDetail(); // its a example aleatory position
  public destination: markerDetail = new markerDetail(); // its a example aleatory position
  coordinates: Array<{ lat: number, lng: number, PumpName: string, label: string }> = [];
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public db: Databaseservice, public locationTracker: LocationTracker
  ) {
    super();
    this.pumpData = this.navParams.data;
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.origin = { latitude: this.lat, longitude: this.lng };
      this.markerLabel = 'You are here';
      this.setMarkers();
    });
  }
  goToDirections() {
    if (this.isPumpSelected) {
      this.geolocation.getCurrentPosition().then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.origin = { latitude: this.lat, longitude: this.lng };
        this.markerLabel = 'You are here';
        this.vc.origin = { latitude: this.lat, longitude: this.lng };
        this.vc.originPlaceId = 'NA';
        this.vc.destination = { latitude: this.selectedPump.lat, longitude: this.selectedPump.lng };
        this.vc.destinationPlaceId = 'NA';
        this.vc.updateDirections();
        this.locationTracker.startTracking();
        this.showHeader = true;
      });
    }
    else
      alert('Please select a pump from the list before you start driving direction');
  }
  start() {
    this.locationTracker.startTracking();
  }

  stop() {
    this.locationTracker.stopTracking();
  }

  onClickPumpMarker(e) {
    this.isPumpSelected = true;
    this.selectedPump.lat = e.lat;
    this.selectedPump.lng = e.lng;
    this.selectedPump.markerLabel = e.PumpName;
    this.selectedPump.label = this.applyHaversine(this.lat, this.lng, e.lat, e.lng).toString() + 'Km';
    this.destination = { latitude: this.selectedPump.lat, longitude: this.selectedPump.lng };
  }
  getEstimatedTime(e) {
    this.estimatedDistance = e.estimatedDistance;
    this.estimatedTime = e.estimatedTime
  }
  setMarkers() {
    if (this.pumpData.PumpName != undefined) {
      this.isPumpSelected = true;
      this.selectedPump.lat = this.pumpData.PumpLatitude;
      this.selectedPump.lng = this.pumpData.PumpLongitude;
      this.selectedPump.markerLabel = this.pumpData.PumpName;
      this.selectedPump.label = this.applyHaversine(this.lat, this.lng, this.pumpData.PumpLatitude, this.pumpData.PumpLongitude).toString() + 'Km';
      this.destination = { latitude: this.selectedPump.lat, longitude: this.selectedPump.lng };
    }
    if (!this.isPumpSelected) {
      this.db.sortedPumpList().subscribe(snapshots => {
        this.coordinates = new Array();
        snapshots.forEach(
          snapshot => {
            this.coordinates.push({
              "lat": snapshot.PumpLatitude,
              "lng": snapshot.PumpLongitude,
              "PumpName": snapshot.PumpName,
              "label": this.applyHaversine(this.lat, this.lng, snapshot.PumpLatitude, snapshot.PumpLongitude).toString() + 'Km'
            });
          }
        );
      });
    }
  }
}

export class SelectedPump {
  lat: number = 0;
  lng: number = 0;
  markerLabel: string;
  label: string = '';
}
export class markerDetail {
  latitude: number = 0;
  longitude: number = 0;
}
