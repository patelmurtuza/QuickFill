import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Databaseservice } from "../../providers/databaseservice";
import { BaseComponent } from '../basecomponent';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FeedBack } from "../feed-back/feed-back";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-request-appointment',
  templateUrl: 'request-appointment.html'
})

export class RequestAppointmentPage extends BaseComponent {
  slots: Array<any>;
  days: Array<any>
  notifyTime: any;
  notifications: any[] = [];
  notificationDays: any[];
  chosenHours: number;
  chosenMinutes: number;
  selectedDayCode: number;
  isenabled: boolean = false;
  arrayBook: Array<{
    slotId: string, time: string,
    Id: string, booked: string
  }>;
  arrayDay: Array<{ name: string, Id: string }>;
  requestInfo: {
    pumpName: string,
  } = { pumpName: '' };

  selectedDay: string;
  isDaySelected: boolean;
  conformingSlots: string;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder
    , public db: Databaseservice,
    public storage: Storage,
    public dialog: Dialogs, public alertCtrl: AlertController
    , public localNotifications: LocalNotifications) {
    super();

    localNotifications.on('click', notification => {
      this.navCtrl.push(FeedBack);
    })
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
    this.requestInfo.pumpName = navParams.data;
    db.getPumpQueue().subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.name == this.requestInfo.pumpName) {
          this.days = new Array();
          this.days = snapshot.Day;
          this.arrayDay = new Array();
          for (let day in this.days) {
            this.arrayDay.push({
              "name": this.days[day].name,
              "Id": this.days[day].id
            });
            //Sorting Array according to Weak Days
            this.arrayDay.sort(this.GetSortOrder("Id"));
          }
        }
      });
    });
  }

  //Displaying Slots
  displaySlots(selectedDay: string) {
    this.selectedDay = selectedDay;
    this.isDaySelected = true;
    for (let day in this.days) {
      if (this.days[day].name == selectedDay) {
        this.selectedDayCode = this.days[day].id;
        this.arrayBook = new Array();
        this.slots = this.days[day].slots;
        for (let slot in this.slots) {
          this.arrayBook.push({
            slotId: slot,
            time: this.slots[slot].time,
            Id: this.slots[slot].id,
            booked: this.slots[slot].booked
          });
        }
      }
    }
  }

  //Booking slot
  slotClicked(slotTime: string, slot: string, slotId: string) {
    this.storage.get('LoggedInUser').then((val) => {
      if (val) {
        let prompt = this.alertCtrl.create({
          title: 'Confirm Booking',
          message: "Enter Vehicle No and Confirm Booking",
          inputs: [
            {
              name: 'vehicleNo',
              placeholder: ' Vehicle No'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: data => {
                console.log('Confirm clicked', data);
                if (data.vehicleNo != "") {
                  this.db.UpdateSelectedSlot(this.selectedDay,
                    this.requestInfo.pumpName, slotId, data.vehicleNo).subscribe(snapshots => {
                      this.displaySlots(this.selectedDay);
                      let hour = slotTime.split(':')
                      this.chosenHours = +(hour[0]);
                      let minutes = hour[1].match(/\d+/g);
                      this.chosenMinutes = +minutes[0];
                      this.localNotification();
                    });
                }
              }
            }
          ]
        });
        prompt.present();
      }
      else {
        this.dialog.prompt("You need to login first", "Request Login", ['ok', 'Cancel']);
      }
    });
  }
  // submit event
  submit(event) {
    // get data and save to firebase

  }

  ShowDays() {
    this.isDaySelected = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestAppointment');
  }

  localNotification() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let firstNotificationTime = new Date();
    let dayDifference = this.selectedDayCode - currentDay;
    if (dayDifference < 0) {
      dayDifference = dayDifference + 7; // for cases where the day is in the following week
    }
    firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes - 10);
    let reminderMsg = 'A gentle reminder for your QuickFill Appointment at ' + this.requestInfo.pumpName + '.';
    this.setNotifications(this.selectedDayCode, firstNotificationTime, reminderMsg);
    firstNotificationTime.setMinutes(this.chosenMinutes + 15);
    let feedbackMsg = 'A gentle reminder to add Feedback for your visit at ' + this.requestInfo.pumpName + '.';
    this.setNotifications(this.selectedDayCode, firstNotificationTime, feedbackMsg);
  }


  setNotifications(daycode, notificationDateTime, message) {
    let notification = {
      id: daycode,
      title: 'Hey!',
      text: message,
      at: notificationDateTime,
      every: 'week'
    };
    this.notifications.push(notification);
    this.localNotifications.schedule(this.notifications);
  }
}

