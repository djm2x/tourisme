import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, NgZone, ViewChild, ElementRef } from '@angular/core';
// import {  } from 'googlemaps';
declare const google;

// declare var google;
// let map: any;
// let infowindow: any;
// let options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  // send object to be edited to parent component
  @Input() currentPosition = new BehaviorSubject(null);
  // @Output() eventToParent2 = new EventEmitter<any>();
  @Input() showMarker = false;
  // google maps zoom level
  @Input() zoom = 15;
  @Input() radius = 5000;
  @Input() type = 'hospital'; // address pharmacy
  // initial center position for the map
  @Input() lat; //  = 33.990235;
  @Input() lng; // = -6.837755;
  infowindow: any;
  map: any;
  // @Input() markers: Marker[] = [];
  location;
  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    // console.log(this.type)
    this.currentPosition.subscribe(r => {
      if (r) {
        // console.log(r.lat, r.lng);
        if (r.lat && r.lng) {
          this.lat = r.lat;
          this.lng = r.lng;
          this.location = { lat: this.lat, lng: this.lng };
          this.initMap();
        }
      }
    });


  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, { center: this.location, zoom: this.zoom });

    const marker = new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, map: this.map });




    this.ngZone.run(() => {
      const opts: any = { location: this.location, radius: this.radius, type: this.type };

      this.map.addListener('center_changed', function () {
        // 3 seconds after the center of the this.map has changed, pan back to the
        // marker.
        // window.setTimeout(function() {
        //   this.map.panTo(marker.getPosition());
        // }, 3000);
      });

      marker.addListener('click', function () {
        this.map.setZoom(8);
        this.map.setCenter(marker.getPosition());
      });

      this.infowindow = new google.maps.InfoWindow();

      this.map.addListener('click', function (event) {// duh! :-( google map zoom on double click!
        // this.map.setZoom(8);
        // this.map.setCenter(marker.getPosition());
        console.log(event)
      });

      this.map.addListener('click', function (e) {
        // placeMarkerAndPanTo(e.latLng, map);

        const marker = new google.maps.Marker({
          position: e.latLng,
          map: this.map
        });

        this.map.panTo(e.latLng);
      });
      // const service: any = new google.maps.places.PlacesService(this.map);


      // service.nearbySearch(opts, (results, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {

      //     this.createMarkers(results);
      //   }
      // });


    });

    // navigator.geolocation.getCurrentPosition((location) => {

    // }, (error) => {
    //   console.log(error);
    // }, options);


    // var myplace = { lat: -33.8665, lng: 151.1956 };
  }

  createMarkers(places: any[]) {
    const bounds = new google.maps.LatLngBounds();
    // const placesList = document.getElementById('places');

    places.forEach(place => {

      const image: string | any | any = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      const marker: any = new google.maps.Marker({
        map: this.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });


      google.maps.event.addListener(marker, 'click', () => {
        const o = `<strong>${place.name.toUpperCase()}<strong> <br> ${place.vicinity}`;


        this.infowindow.setContent(o);
        this.infowindow.open(this.map, marker);
        console.log(place)
      });

      // var li = document.createElement('li');
      // li.textContent = place.name;
      // placesList.appendChild(li);

      bounds.extend(place.geometry.location);
    });


    this.map.fitBounds(bounds);
  }

  // createMarker2(place) {
  //   var placeLoc = place.geometry.location;
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: placeLoc
  //   });

  //   google.maps.event.addListener(marker, 'click', function () {
  //     this.infowindow.setContent(place.name);
  //     this.infowindow.open(map, this);
  //   });
  // }


}
