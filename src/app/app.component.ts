import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FavouritePumpsPage } from '../pages/favourite-pumps/favourite-pumps';
import { FillingHistoryPage } from '../pages/filling-history/filling-history';
import { PumpAssignmentPage } from '../pages/pump-assignment/pump-assignment';
import { PumpListPage } from '../pages/pump-list/pump-list';
import { PumpOwnerSignUpPage } from '../pages/pump-owner-sign-up/pump-owner-sign-up';
import { PumpQueuePage } from '../pages/pump-queue/pump-queue';
import { CustomerSignUpPage } from '../pages/customer-sign-up/customer-sign-up';
import { ThankYou } from '../pages/thank-you/thank-you';
import { ForgotPin } from '../pages/forgot-pin/forgot-pin';
import { FeedBack } from '../pages/feed-back/feed-back';
import { SignOutPage } from '../pages/sign-out/sign-out';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Customer SignUp', component: CustomerSignUpPage },
      { title: 'My Favourite Pumps', component: FavouritePumpsPage },
      { title: 'Filling History ', component: FillingHistoryPage },
      { title: 'Pump Assignment ', component: PumpAssignmentPage },
      { title: 'Pump List ', component: PumpListPage },
      { title: 'Pump Owner SignUp Page ', component: PumpOwnerSignUpPage },
      { title: 'Pump Queue ', component: PumpQueuePage },
      { title: 'Thank You', component: ThankYou },
      { title: 'Forget Pin', component: ForgotPin },
      { title: 'FeedBack', component: FeedBack },
      {title:'SignOut',component:SignOutPage}

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
