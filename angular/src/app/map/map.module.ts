import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
// import { AgmCoreModule } from '@agm/core';
import { KEY } from './config';
import { MapAgmComponent } from './map.agm.component';
import { AgmCoreModule } from '@agm/core';

const KEY_MAP = 'AIzaSyDm1sMO4dR7OrZWe5Ten0_Ol2p7QXdsjwo ';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: KEY_MAP,
      // libraries: ['places'],
    }),
  ],
  declarations: [
    MapComponent,
    MapAgmComponent
  ],
  exports: [
    MapComponent,
    MapAgmComponent
  ],
})
export class MapModule { }
