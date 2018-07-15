import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SMS } from '@ionic-native/sms';
import { Databaseservice } from "../../providers/databaseservice";
import { HomePage } from '../home/home';

import 'rxjs/add/operator/debounceTime';
@IonicPage()
@Component({
  selector: 'page-customer-sign-up',
  templateUrl: 'customer-sign-up.html',
})
export class CustomerSignUpPage {
  userCreateAccountForm: FormGroup;
  name: string;
  users: any;
  public type = "password";
  public showPass = false;
  userInfo: {
    name: string,
    mobileNo: number,
    pin: string,
    email: string,
    otp: number
  } = {
      name: '',
      mobileNo: null,
      pin: '',
      email: '',
      otp: null

    };

  constructor(public sms: SMS,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: Databaseservice,
    public toastCtrl: ToastController) {
    this.users = this.db.userCreateAccount();
  }
  ngOnInit(): any {
    this.userCreateAccountForm = this.formBuilder.group({
      mobileNo: ['', [Validators.maxLength(10)]],
      pin: ['', [Validators.required, Validators.minLength(3)]],
      email: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      otp: [''],
    });
  }
  onSubmit() {
    let sendedOtp = 123;
    if (this.userInfo.otp == sendedOtp) {
      this.users.push({
        Name: this.userInfo.name,
        MobileNo: this.userInfo.mobileNo,
        Pin: this.userInfo.pin,
        Email: this.userInfo.email
      }).then(function (ref) {
        console.log("Key:", ref);
      }, function (error) {
        console.log("Error:", error);
      });
      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'

      });
      toast.present();
      this.navCtrl.push(HomePage);
    }
    else {
      alert("Please Enter Correct OTP");
    }

  }
  showPassword() {
    this.showPass = !this.showPass;      //As text Hide Pass or Show Pass is clicked its state must change
    if (this.showPass) {
      this.type = "text";
    }
    else {
      this.type = "password";

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSignUp');
  }
}
