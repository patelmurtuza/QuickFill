import { Injectable } from '@angular/core';
import { SelectSearchable } from '../pages/select/select';

@Injectable()
export abstract class BaseComponent {
  public distance: number = 0;
  public applyHaversine(currentLatitude, currentLongitude, pumpLatitude, pumpLongitude) {
    let usersLocation = {
      lat: currentLatitude,
      lng: currentLongitude,
    };
    let placeLocation = {
      lat: pumpLatitude,
      lng: pumpLongitude
    };
    this.distance = parseFloat(this.getDistanceBetweenPoints(
      usersLocation,
      placeLocation,
      'km'
    ).toFixed(3));
    return this.distance;
  }

  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  getDistanceBetweenPoints(start, end, units): number {
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };
    let R = earthRadius[units || 'km'];
    //let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }
  toRad(x) {
    return x * Math.PI / 180;
  }
  getCities(): City[] {
    return [
      { id: 0, name: 'Kharghar', state: 'Maharashtra' },
      { id: 2, name: 'Panvel', state: 'Maharashtra' },
      { id: 3, name: 'Nerul', state: 'Maharashtra' },
      { id: 4, name: 'Vashi', state: 'Maharashtra' },
      { id: 5, name: 'Mumbai', state: 'Maharashtra' },
      { id: 6, name: 'Kamothe', state: 'Maharashtra' },
      { id: 7, name: 'Karjade', state: 'Maharashtra' },
      { id: 8, name: 'Kalamboli', state: 'Maharashtra' },
      { id: 9, name: 'Belapur ', state: 'Maharashtra' },
      { id: 10, name: 'Seawoods', state: 'Maharashtra' },
    ];
  }
  searchPorts(event: { component: SelectSearchable, text: string }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component.isSearching = true;

    // Simulate AJAX.
    setTimeout(() => {
      event.component.items = this.getCities().filter(port => {
        return port.name.toLowerCase().indexOf(text) !== -1 ||
          port.state.toLowerCase().indexOf(text) !== -1;
      });

      event.component.isSearching = false;
    }, 2000);
  }

}

export class City {
  public id: number;
  public name: string;
  public state: string;
}
