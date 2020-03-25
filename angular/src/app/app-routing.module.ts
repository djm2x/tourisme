// routeur principal

import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // Redirection à la connection vers la page d'authentification 
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},

  // Lien de page d'authentification
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), },

  // page principale aprés l'authentification
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
