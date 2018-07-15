import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Databaseservice } from "../../providers/databaseservice";
import { FavouritePumpsPage } from "../favourite-pumps/favourite-pumps";
import { ResetPasswordPage } from '../reset-password/reset-password';
import { CustomerSignUpPage } from '../customer-sign-up/customer-sign-up';

import { Storage } from '@ionic/storage';
@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  loginForm: FormGroup;
  userName: string
  isLoggedIn: boolean = false;
  userInfo: { userId: string, pin: string } = { userId: '', pin: '' };
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public db: Databaseservice) {
    storage.get('LoggedInUser').then((val) => {
      if (val) {
        this.userName = val.name;
        this.isLoggedIn = true;
        this.navCtrl.push(FavouritePumpsPage);
      }
      else
        this.isLoggedIn = false;
    });
  }

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({
      'userId': ['', [Validators.required, Validators.minLength(3)]],
      'pin': ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  resetpin() {
    this.navCtrl.push(ResetPasswordPage);
  }
  createAccount() {
    this.navCtrl.push(CustomerSignUpPage);
  }
  onSubmit() {
    this.db.signIn(this.userInfo.userId.toLowerCase()).subscribe((result) => {
      if (result.length > 0) {
        if (result[0].Pin == this.userInfo.pin) {
          this.storage.set("LoggedInUser", result[0]);  //Storing user Information in loccal Storage
          this.storage.set("LoggedInUserKey", result[0].$key);
          this.navCtrl.push(FavouritePumpsPage);
        }
        else {
          console.log('Inavlid User Id / Pin');
        }
      }
      else {
        console.log('User does not exist');
      }
    });
  }

  isValid(field: string) {
    let formField = this.loginForm.get(field);
    return formField.valid || formField.pristine;
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.match('^([A-Za-z0-9]+\@((gmail)|(yahoo))\.(com))$'))) {
      return { invalidEmail: true };
    }
  }
}
