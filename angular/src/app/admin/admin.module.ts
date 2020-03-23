import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ParcoursComponent } from './parcours/parcours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../mat.module';
import { UserComponent } from './user/user.component';
import { UpdateComponent } from './user/update/update.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ParcoursComponent,
    UserComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
  ]
})
export class AdminModule { }
