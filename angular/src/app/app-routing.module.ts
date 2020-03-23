import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MyGuard } from './shared/my.guard';
import { AccountComponent } from './home/account/account.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), },
  // { path: 'home/account/:id', component: AccountComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
