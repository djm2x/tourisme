import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { KEY } from './config';


@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: KEY,
      libraries: ['places'],
    }),
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
})
export class MapModule { }
