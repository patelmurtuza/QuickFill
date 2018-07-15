import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
declare var google: any;
@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin: any;
  @Input() destination: any;
  @Input() originPlaceId: any;
  @Input() destinationPlaceId: any;
  @Input() waypoints: any;
  @Output('onUpdateDirection')
  onUpdateDirection = new EventEmitter<any>();
  latLngA: any;
  latLngB: any;
  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }
  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var me = this;
      this.latLngA = new google.maps.LatLng({ lat: this.origin.latitude, lng: this.origin.longitude });
      this.latLngB = new google.maps.LatLng({ lat: this.destination.latitude, lng: this.destination.longitude });
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor: '#00468c'
        }
      });
      // this.directionsDisplay.setDirections({ routes: [] });
      directionsService.route({
        origin: { lat: this.origin.latitude, lng: this.origin.longitude },
        destination: { lat: this.destination.latitude, lng: this.destination.longitude },
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          map.setZoom(30);
          var point = response.routes[0].legs[0];
          let estimatedTime = point.duration.text;
          let estimatedDistance = point.distance.text;
          me.onUpdateDirection.emit({ estimatedTime, estimatedDistance });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

  public getcomputeDistance(latLngA, latLngB): any {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}
//http://www.17educations.com/angularjs-2/google-map-directions-display-angular-2/
