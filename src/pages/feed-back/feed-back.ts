import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Databaseservice } from "../../providers/databaseservice";
/**
 * Generated class for the FeedBack page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBack {
  feedBack: {
    workSpeed: number,
    safetyPrecuations: number,
    serviceProvBehaviour: number
    , comments: string
  } = {
      workSpeed: null,
      safetyPrecuations:null,
      serviceProvBehaviour:null,
      comments: ''
    };
    items: any

  feedBackForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public fb:FormBuilder,public db:Databaseservice) {
    this.items=this.db.feedBackPush();
  }
ngOnInit(): any
{
  this.feedBackForm=this.fb.group({
workSpeed:['',Validators.required],
safetyPrecuations:['',Validators.required],
serviceProvBehaviour:['',Validators.required],
comments:['',Validators.required]
  });
}
onFeedbackSubmit()
{
  this.items.push({
        WorkSpeed: this.feedBack.workSpeed,
        safetyPrecuations: this.feedBack.safetyPrecuations,
        ServiceProviderBehaviour: this.feedBack.serviceProvBehaviour,
      Comments: this.feedBack.comments
      });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedBack');
  }

}
