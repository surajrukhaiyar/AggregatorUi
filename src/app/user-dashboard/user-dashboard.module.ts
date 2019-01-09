import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { MatTableComponent } from './mat-table/mat-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule } from '@angular/material';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CrudServiceService } from '../services/crud-service.service';

@NgModule({
  declarations: [MatTableComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  providers:[
    CrudServiceService
  ]
})
export class UserDashboardModule { }
