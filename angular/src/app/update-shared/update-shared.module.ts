import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcoursComponent } from './parcours/parcours.component';
import { EtapComponent } from './etap/etap.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ReponceComponent } from './reponce/reponce.component';
import { MatModule } from '../mat.module';
import { UpdateSharedComponent } from './update-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddEtapComponent } from './etap/add-etap/add-etap.component';
import { TitleModule } from '../components/title/title.module';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [
    ParcoursComponent,
    EtapComponent,
    QuizzComponent,
    ReponceComponent,
    UpdateSharedComponent,
    AddEtapComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
    TitleModule,
    MapModule,
  ],
  exports: [
    UpdateSharedComponent
  ]
})
export class UpdateSharedModule { }
