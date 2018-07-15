import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { Databaseservice } from "../../providers/databaseservice";
import { BaseComponent, City } from '../basecomponent';
import { SelectSearchable } from '../select/select';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';

@IonicPage()
@Component({
  selector: 'page-pump-owner-sign-up',
  templateUrl: 'pump-owner-sign-up.html',
})
export class PumpOwnerSignUpPage extends BaseComponent {
  myForm1: FormGroup;
  cities: City[];
  cityNames: string[];
  //citysearch: City;
  @ViewChild('map') mapElement: ElementRef;
  public geocoded: boolean;
  public results: string;
  items: any;
  map: any;
  userInfo: {
    pumpName: string,
    pumpCompany: string,
    pumpAddress: string,
    currentLat: number,
    currentlong: number,
    locality: string,
    citySearch: {
      id: number,
      name: string,
      state: string
    }
  } =

    {
      pumpName: '',
      pumpCompany: '',
      pumpAddress: '',
      currentLat: 0,
      currentlong: 0,
      locality: '',
      citySearch: { id: 0, name: '', state: '' }
    };
  constructor(public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public db: Databaseservice,
    public _GEOCODE: GeocoderProvider
  ) {
    super();
    this.items = this.db.PumpList();
    this.getCurrentLocation();
    this.cities = this.getCities();

  }
  onSubmit() {
    this.items.push({
      PumpName: this.userInfo.pumpName,
      PumpAddress: this.userInfo.pumpAddress,
      PumpCompany: this.userInfo.pumpCompany,
      PumpLatitude: this.userInfo.currentLat,
      PumpLongitude: this.userInfo.currentlong
    }).then(function (ref) {
      console.log("Key:", ref);
    }, function (error) {
      console.log("Error:", error);
    });
    this.db.createPumpQueue(this.userInfo.pumpName,"7:30", "17:00");
  }

  ngOnInit(): any {
    this.myForm1 = this.formBuilder.group({
      'pumpName': ['', [Validators.required, Validators.minLength(3)]],
      'pumpCompany': [''],
      'pumpAddress': [''],
      'currentLat': [''],
      'currentlong': [''],
      'locality': [''],
      'citySearch': ['']
    });
  }
  ionViewDidLoad() {
  }
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.userInfo.currentLat = position.coords.latitude;
      this.userInfo.currentlong = position.coords.longitude
      // this._GEOCODE.reverseGeocode(this.userInfo.currentLat, this.userInfo.currentlong)
      //   .then((data: any) => {
      //     this.geocoded = true;
      //     this.results = data;
      //     this.userInfo.locality = this.results;
      //   })
      //   .catch((error: any) => {
      //     this.geocoded = true;
      //     this.results = error.message;
      //   });
    });
  }
  cityChange(event: { component: SelectSearchable, value: any }) {
    console.log('value:', event.value);
  }


}
