import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedComponent } from './shared/shared.component';
import { ListComponent } from './list/list.component';
import { FollowedComponent } from './followed/followed.component';
import { CreatedComponent } from './created/created.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../mat.module';
import { UpdateComponent } from './update/update.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateSharedModule } from '../update-shared/update-shared.module';
import { TitleModule } from '../components/title/title.module';
import { MapModule } from '../map/map.module';


@NgModule({
  declarations: [
    HomeComponent,
    SharedComponent,
    ListComponent,
    FollowedComponent,
    CreatedComponent,
    AccountComponent,
    UpdateComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
    UpdateSharedModule,
    TitleModule,
    MapModule,
  ]
})
export class HomeModule { }
