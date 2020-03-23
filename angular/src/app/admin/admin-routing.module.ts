import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full'},
      // { path: '**', redirectTo: 'home', pathMatch: 'full'},
      { path: 'users', component: UsersComponent},
      { path: 'user', component: UserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
