import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreatedComponent } from './created/created.component';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account/account.component';
import { FollowedComponent } from './followed/followed.component';
import { UpdateComponent } from './update/update.component';
import { DetailComponent } from './detail/detail.component';
import { MyGuard } from '../shared/my.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      // Si /home demandé alors router vers /home/welcome
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      
      // Si /home/welcome demandé alors composant WelcomeComponent
      { path: 'welcome', component: WelcomeComponent},
      // Si /home/list demandé alors composant ListComponent
      { path: 'list', component: ListComponent},
      // Si /home/created/:id demandé alors composant CreatedComponent
      { path: 'created/:id', component: CreatedComponent},
      // Si /home/account demandé alors composant AccountComponent
      { path: 'account', component: AccountComponent},
      // Si /home/followed/:id demandé alors composant FollowedComponent
      { path: 'followed/:id', component: FollowedComponent},
      // Si /home/update/:id demandé alors composant UpdateComponent
      { path: 'update/:id', component: UpdateComponent, canActivate: [MyGuard]},
      // Si /home/detail/:id demandé alors composant DetailComponent
      { path: 'detail/:id', component: DetailComponent, canActivate: [MyGuard]},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
