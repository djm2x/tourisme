import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreatedComponent } from './created/created.component';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account/account.component';
import { FollowedComponent } from './followed/followed.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      // { path: '**', redirectTo: 'home', pathMatch: 'full'},
      { path: 'list', component: ListComponent},
      { path: 'created', component: CreatedComponent},
      { path: 'account', component: AccountComponent},
      { path: 'followed', component: FollowedComponent},
      { path: 'update/:id', component: UpdateComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
