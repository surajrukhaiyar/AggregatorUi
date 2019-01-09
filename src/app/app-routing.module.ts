import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status-form/status/status.component'
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/updateStatus', 
    pathMatch: 'full' 
  },
  {
   path:'updateStatus',
   component: StatusComponent
  },
  {
    path: 'signUp',
    component: UserSignUpComponent
  },
  {
    path: 'userdashboard',
    loadChildren: './user-dashboard/user-dashboard.module#UserDashboardModule'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
