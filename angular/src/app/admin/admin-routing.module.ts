import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      // { path: '**', redirectTo: 'home', pathMatch: 'full'},
      { path: 'users', component: UsersComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
