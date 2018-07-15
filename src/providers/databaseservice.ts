import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class Databaseservice {
  users: FirebaseListObservable<any>;
  items: FirebaseListObservable<any>;
  found: boolean = false;
  constructor(public af: AngularFireDatabase) {
  }
  public userCreateAccount(): FirebaseListObservable<any[]> {
    this.users = this.af.list('/Users', { preserveSnapshot: true });
    return this.users;
  }
  public PumpList(): FirebaseListObservable<any[]> {
    this.items = this.af.list('/Pumps');
    return this.items;
  }
  public feedBackPush(): FirebaseListObservable<any[]> {
    this.items = this.af.list('/FeedBack');
    return this.items;
  }
  public sortedPumpList(): FirebaseListObservable<any[]> {
    this.items = this.af.list('Pumps');
    return this.items;
  }
  public requestAppointment(): FirebaseListObservable<any[]> {
    this.items = this.af.list('/ActiveRequests');
    return this.items;
  }
  public getPumpQueue(): FirebaseListObservable<any[]> {
    this.items = this.af.list('/PumpQueue');
    return this.items;
  }
  public UpdateSelectedSlot(selecetedDay, selectedPump, slotId, vehicleNo): FirebaseListObservable<any[]> {
    let key: any = selectedPump + "/Day/" + selecetedDay + "/slots/" + slotId;
    this.af.object('/PumpQueue/' + key)
      .update({ booked: "true", VehicleNo: vehicleNo });
    this.items = this.af.list('/PumpQueue/' + key);
    return this.items;
  }
  public signIn(userId: string): FirebaseListObservable<any[]> {
    let signInResult: FirebaseListObservable<any>;
    if (Number(userId)) {
      signInResult = this.af.list('/Users', {
        query: {
          orderByChild: 'MobileNo',
          equalTo: userId
        }
      });
    }
    else {
      signInResult = this.af.list('/Users', {
        query: {
          orderByChild: 'Email',
          equalTo: userId
        }
      });
    }
    return signInResult;
  }
  public pushfavourite(UserNodeKey, pumpCity, pumpName, currentLatitude, currentLongitude, pumpAddress, pumpCompany): FirebaseListObservable<any[]> {
    let result: FirebaseListObservable<any>;
    let key: any = '/Users/' + UserNodeKey;
    result = this.af.list(key + '/favourites');
    result.push({
      PumpName: pumpName,
      PumpAddress: pumpAddress,
      PumpCompany: pumpCompany,
      PumpCity: pumpCity,
      PumpLatitude: currentLatitude,
      PumpLongitude: currentLongitude
    }).then(function (ref) {
      console.log("Key:", ref);
    }, function (error) {
      console.log("Error:", error);
    });
    return result;
  }
  public getFavouriteList(UserNodeKey): FirebaseListObservable<any[]> {
    let result: FirebaseListObservable<any>;
    let key: any = '/Users/' + UserNodeKey;
    result = this.af.list(key + '/favourites');
    return result;
  }
  public removeFavourites(UserNodeKey, pumpkey) {
    let result: FirebaseListObservable<any>;
    let key: any = '/Users/' + UserNodeKey;
    result = this.af.list(key + '/favourites');
    result.remove(pumpkey);
    return result;

  }
  public createPumpQueue(pumpName: string, start, end) {
    var start = start.split(":");
    var end = end.split(":");
    start = parseInt(start[0]) * 60 + parseInt(start[1]);
    end = parseInt(end[0]) * 60 + parseInt(end[1]);
    let pumpQueue: FirebaseListObservable<any>;
    let weekArray: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    pumpQueue = this.af.list('/PumpQueue/' + pumpName);
    this.af.object('/PumpQueue/' + pumpName + "/").update({ ['name']: pumpName });

    for (var i in weekArray) {
      this.af.object('/PumpQueue/' + pumpName + '/Day/' + weekArray[i] + '/').set({ 'id': parseInt(i) + 1, 'name': weekArray[i] });
      for (var time = start; time <= end; time += 30) {
        this.af.object('/PumpQueue/' + pumpName + '/Day/' + weekArray[i] + '/slots/' + this.timeString(time) + "/").set({
          'id': this.timeString(time),
          booked: "false",
          time: this.timeString(time)
        });
      }
    }
  }
  public timeString(time) {
    let hours: any = Math.floor(time / 60);
    let minutes: any = time % 60;
    if (hours < 10) hours = "0" + hours; //optional
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes;
  }
}
