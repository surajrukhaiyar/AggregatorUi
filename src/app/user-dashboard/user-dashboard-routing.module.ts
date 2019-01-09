import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatTableComponent } from './mat-table/mat-table.component'

const routes: Routes = [
  {
    path: '',
    component: MatTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
