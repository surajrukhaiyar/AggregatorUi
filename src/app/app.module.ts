import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule,
       MatButtonModule, MatInputModule, MatSidenavModule, MatIconModule,
       MatListModule, MatOptionModule, MatSelectModule, MatDialogModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import { StatusComponent } from './status-form/status/status.component';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { MessagesComponent } from './messages/messages.component';
import { MatTableComponent } from './mat-table/mat-table.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { WfDetailDialogComponent } from './wf-detail-dialog/wf-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    UserSignUpComponent,
    MessagesComponent,
    MatTableComponent,
    WfDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
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
  entryComponents: [
    WfDetailDialogComponent
  ],
  providers: [
      HttpErrorHandler,
      MessageService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
