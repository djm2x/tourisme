// routeur d'authentification

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AuthComponent } from './auth.component';



const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AuthComponent,
    children: [

      // si /auth appelé alors module /auth/login
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      
      // si /auth/login appelé alors LoginComponent
      { path: 'login', component: LoginComponent},

      // si /auth/create appelé alors CreateComponent
      { path: 'create', component: CreateComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
