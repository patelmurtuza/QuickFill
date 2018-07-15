import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{FormGroup,FormBuilder,Validators,AbstractControl} from '@angular/forms';
/**
 * Generated class for the ForgotPin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
function pinMatcher(c: AbstractControl)
{
let npinControl=c.get('npin');
let rnpinControl=c.get('rnpin');

if( npinControl.value===rnpinControl.value)
{
  return null
};
return{'match':true}
};
@IonicPage()
@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPin {
forgotPinForm: FormGroup;
forgotPin:{vcode:string,npin:string,rnpin:string}={vcode:'',npin:'',rnpin:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder) {
  }
  ngOnInit():any{
    this.forgotPinForm=this.fb.group({
      vcode:['',Validators.required],
      pinGroup:this.fb.group({
        npin:['',Validators.required],
        rnpin:['',Validators.required]
 },{validator:pinMatcher})
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPin');
  }

}
