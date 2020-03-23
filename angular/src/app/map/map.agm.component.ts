import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { MapService } from './map.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-agm-map',
  templateUrl: './map.agm.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapAgmComponent implements OnInit {
  // send object to be edited to parent component
  @Input() eventToParent = new EventEmitter<any>();
  // @Output() eventToParent2 = new EventEmitter<any>();
  @Input() postitionFromParent = new EventEmitter();
  @Input() showMarker = true;
  // google maps zoom level
  zoom = 6;
  // initial center position for the map
  @Input() lat = 48.86; // = 33.927251;
  @Input() lng = 2.39; // = -6.887098;
  @Input() draggable = false; // = -6.887098;

  @Input() markers: Marker[] = [];

  constructor() { }

  ngOnInit(): void {
    // if (this.lat && this.lng && this.showMarker) {
    //   this.markers.push({ lat: this.lat, lng: this.lng, draggable: false });
    // }

    this.postitionFromParent.subscribe(r => {
      if (r) {
        // console.log(r.lat, r.lng);
        if (r.lat && r.lng) {
          this.lat = r.lat;
          this.lng = r.lng;
          this.markers.push({ lat: this.lat, lng: this.lng, draggable: this.draggable });

          console.log(this.markers)
        }
      }
    });
  }

  clickedMarker(label: Location, index: number) {
    // console.log(label);
    // console.log(`clicked the marker: ${label || index}`);
    // this.eventToParent2.next(label.users[0]);
  }

  mapClicked($event: any) {
    if (!this.draggable) {
      return;
    }
    // console.log($event);
    if (this.showMarker) {
      this.lat = $event.coords.lat.toFixed(2);
      this.lng = $event.coords.lng.toFixed(2);
      // this.markers.shift();
      this.markers = [];
      this.markers.push({ lat: this.lat, lng: this.lng, draggable: this.draggable });
      this.eventToParent.next({ lat: this.lat, lng: this.lng });
    }
    // console.log('$event.coords.lat = ', $event.coords.lat);
    // console.log('$event.coords.lng = ', $event.coords.lng);
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m, $event: any) {
    console.log(m);
    this.lat = $event.coords.lat.toFixed(2);
    this.lng = $event.coords.lng.toFixed(2);
    this.eventToParent.next({ lat: this.lat, lng: this.lng });
  }


}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
