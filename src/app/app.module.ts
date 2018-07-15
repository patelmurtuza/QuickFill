import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Databaseservice } from "../providers/databaseservice";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { SMS } from '@ionic-native/sms';
import { ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "angular2-google-maps/core";
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Dialogs } from '@ionic-native/dialogs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { DirectionsMapDirective } from '../directives/maproute';
import { LocationTracker } from '../providers/location-tracker';
//import { Pro } from '@ionic/pro';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignOutPage }from '../pages/sign-out/sign-out'
import { FavouritePumpsPage } from '../pages/favourite-pumps/favourite-pumps';
import { FillingHistoryPage } from '../pages/filling-history/filling-history';
import { PumpAssignmentPage } from '../pages/pump-assignment/pump-assignment';
import { PumpListPage } from '../pages/pump-list/pump-list';
import { Map } from '../pages/map/map';
import { List } from '../pages/list/list';
import { PumpDetails } from '../pages/pump-details/pump-details';
import { CustomerSignUpPage } from '../pages/customer-sign-up/customer-sign-up';
import { PumpOwnerSignUpPage } from '../pages/pump-owner-sign-up/pump-owner-sign-up';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { PumpQueuePage } from '../pages/pump-queue/pump-queue';
import { RequestAppointmentPage } from '../pages/request-appointment/request-appointment';
import { ThankYou } from '../pages/thank-you/thank-you'
import { ForgotPin } from '../pages/forgot-pin/forgot-pin';
import { FeedBack } from '../pages/feed-back/feed-back';
import { SelectSearchableModule } from '../pages/select/select-module';
export const firebaseConfig = {
  apiKey: "AIzaSyBs_KKlJFXqHaTnNKoF_i_jmQe6i-h6eAk",
  authDomain: "quickfill-49ed8.firebaseapp.com",
  databaseURL: "https://quickfill-49ed8.firebaseio.com",
  projectId: "quickfill-49ed8",
  storageBucket: "quickfill-49ed8.appspot.com",
  messagingSenderId: "945130210131"
};
// const IonicPro = Pro.init('c161d25f', {
//   appVersion: "0.0.0"
// });

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
   // IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerSignUpPage,
    FavouritePumpsPage,
    FillingHistoryPage,
    PumpAssignmentPage,
    PumpListPage,
    PumpOwnerSignUpPage,
    ResetPasswordPage,
    PumpQueuePage,
    RequestAppointmentPage,
    ThankYou,
    ForgotPin,
    PumpDetails,
    Map,
    List,
    FeedBack,
    SignOutPage,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    SelectSearchableModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBzQKWG6cd5itcJCqKij-6eo4pzBlp5n7U', libraries: ["places"] },
    )
  ],
  // AIzaSyDDzhdhd-x2slNSzw3SFpNTYqb7RuhMQSc
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FeedBack,
    CustomerSignUpPage,
    FavouritePumpsPage,
    FillingHistoryPage,
    PumpAssignmentPage,
    PumpListPage,
    PumpOwnerSignUpPage,
    ResetPasswordPage,
    PumpQueuePage,
    RequestAppointmentPage,
    ThankYou,
    ForgotPin,
    Map,
    List,
    SignOutPage,
    PumpDetails
  ],
  providers: [
    LocationTracker,
    BackgroundGeolocation,
    NativeGeocoder,
    Dialogs,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    SMS,
    Geolocation,
    { provide: ErrorHandler, useClass: MyErrorHandler },
    Databaseservice,
    AngularFireDatabaseProvider,
    GeocoderProvider
  ]
})
export class AppModule { }
