// import { BehaviorSubject } from 'rxjs';
// import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
// import { MapService } from './map.service';
// import { MapsAPILoader } from '@agm/core';

// declare const google;


// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent implements OnInit {
//   // send object to be edited to parent component
//   @Input() currentPosition = new BehaviorSubject(null);
//   @Output() eventToParent2 = new EventEmitter<any>();
//   @Input() showMarker = false;
//   // google maps zoom level
//   @Input() zoom = 8;
//   // initial center position for the map
//   @Input() lat; // = 33.927251;
//   @Input() lng; // = -6.887098;

//   @Input() markers: Marker[] = [];

//   constructor(private mapSearch: MapService, private mapsAPILoader: MapsAPILoader,
//     private ngZone: NgZone) { }

//   ngOnInit(): void {
//     this.currentPosition.subscribe(r => {
//       if (r) {
//         console.log(r.lat, r.lng);
//         if (r.lat && r.lng && this.showMarker) {
//           this.lat = r.lat;
//           this.lng = r.lng;
//           this.markers.push({ lat: r.lat, lng: r.lng, draggable: false });

//           this.mapSearch.restaurantPlaceApi(this.lat, this.lng).subscribe(r => {
//             console.warn(r);
//           })
//         }
//       }
//     })

//     this.mapsAPILoader.load().then(() => {
//       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
//         types: ["address"]
//       });
//       autocomplete.addListener("place_changed", () => {
//         this.ngZone.run(() => {
//           //get the place result
//           let place: google.maps.places.PlaceResult = autocomplete.getPlace();

//           //verify result
//           if (place.geometry === undefined || place.geometry === null) {
//             return;
//           }

//           //set latitude, longitude and zoom
//           this.latitude = place.geometry.location.lat();
//           this.longitude = place.geometry.location.lng();
//           this.zoom = 12;
//         });
//       });
//     });

//   }

//   clickedMarker(label: any, index: number) {
//     console.log(label);
//     // console.log(`clicked the marker: ${label || index}`);
//     // this.eventToParent2.next(label.users[0]);
//   }

//   mapClicked($event: any) {
//     // console.log($event);
//     if (this.showMarker) {
//       this.lat = $event.coords.lat;
//       this.lng = $event.coords.lng;
//       this.markers.shift();
//       this.markers.push({ lat: this.lat, lng: this.lng, draggable: false });
//       // this.eventToParent.next({ lat: $event.coords.lat, lng: $event.coords.lng });
//     }
//     // console.log('$event.coords.lat = ', $event.coords.lat);
//     // console.log('$event.coords.lng = ', $event.coords.lng);
//     // this.markers.push({
//     //   lat: $event.coords.lat,
//     //   lng: $event.coords.lng,
//     //   draggable: true
//     // });
//   }

//   markerDragEnd(e, $event: any) {
//     console.log('dragEnd', $event);
//   }

//   private setCurrentPosition() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         // this.latitude = position.coords.latitude;
//         // this.longitude = position.coords.longitude;
//         this.zoom = 12;
//       });
//     }
//   }


// }

// // just an interface for type safety.
// interface Marker {
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable: boolean;
// }
