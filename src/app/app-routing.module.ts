import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status-form/status/status.component'
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { WfDetailDialogComponent } from './wf-detail-dialog/wf-detail-dialog.component';

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
    component: MatTableComponent
  },{
    path:'wfDetail',
    component:WfDetailDialogComponent
  },{
    path:'wfDetail/:rowId',
    component:WfDetailDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
