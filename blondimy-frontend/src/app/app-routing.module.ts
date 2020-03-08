import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './core/AuthGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  }// ,
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
