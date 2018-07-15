import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { RequestAppointmentPage } from '../request-appointment/request-appointment';
import { Databaseservice } from "../../providers/databaseservice";
import { Dialogs } from "@ionic-native/dialogs";
import { Map } from '../map/map';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

declare var window: any;
/**
 * Generated class for the PumpDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pump-details',
  templateUrl: 'pump-details.html',
})

export class PumpDetails {
  pumpDetails: any;
  favouriteList: Array<any>;
  isFavourite: boolean = false;
  favoriteListPumpKey: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public db: Databaseservice,
    public toastCtrl: ToastController,
  public alertCtrl:AlertController,public dialog:Dialogs) {
    this.pumpDetails = this.navParams.data;
    this.isFavourite = false;

    //Checking whether user as Loogged in and set addtoFavourite and removeFromFavourite button
    // by checking whether the selected pump is in userlist favourite list or Not

    storage.get('LoggedInUserKey').then((val) => {
      let userNodeKey = val;
      //Bring the Favourite List for the User
      this.db.getFavouriteList(userNodeKey).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (this.pumpDetails.PumpName == snapshot.PumpName) {
            //Storing key of the pump in favouritePumpList used in removing Pump From Favourite List  
            this.favoriteListPumpKey = snapshot.$key
            //Used for diplaying AddToFavourite and RemoveFromFavourite Button
            this.isFavourite = true;
          }
        });
      });
    });
  }
  ionViewDidLoad() {
  }
  goToMap() {
    this.navCtrl.push(Map, this.pumpDetails);
  }
  addToFavourite() {
    console.log("ust")
    this.storage.get('LoggedInUserKey').then((val) => {
      if(val){
      this.db.pushfavourite(val, this.pumpDetails.PumpCity, this.pumpDetails.PumpName,
        this.pumpDetails.PumpLatitude, this.pumpDetails.PumpLongitude, this.pumpDetails.PumpAddress,
        this.pumpDetails.PumpCompany)
            let toast = this.toastCtrl.create({
              message: this.pumpDetails.PumpName + ' Pump has been added as Favourite Pumps',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          else
          {
            let toast = this.toastCtrl.create({
              message: 'You Need to Login First',
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.navCtrl.push(HomePage);

          }
          });
  }
  removeFromFavourite() {
    this.storage.get('LoggedInUserKey').then((val) => {
     if (val) {
       this.dialog.confirm("Are you sure you want to remove "+ this.pumpDetails.PumpName+ " from Favourite List",
      "Remove From Favourite",['Confirm','Cancel']).then((confirmButtonIndex)=>{
        if (confirmButtonIndex) {
          this.db.removeFavourites(val, this.favoriteListPumpKey);
          this.isFavourite = false;
          let toast = this.toastCtrl.create({
            message: this.pumpDetails.PumpName + ' Pump has been removed From Favourite List',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });
          

      }
    });
  }
  bookAppointment() {
    this.navCtrl.push(RequestAppointmentPage, this.pumpDetails.PumpName)
  }
}
