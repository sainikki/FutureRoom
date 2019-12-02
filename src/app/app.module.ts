import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { PushNotificationsModule } from 'ng-push';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ConfroomComponent } from './confroom/confroom.component';
import { EventService } from './event.service';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

import { DisplayerComponent } from './kiosk/displayer/displayer.component';
import { ProgressComponent } from './kiosk/progress/progress.component';
import { DetailsService } from './kiosk/displayer/DetailsService';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { GridModule } from '@syncfusion/ej2-angular-grids';



const appRoutes: Routes = [ {
  path: '',                     //default component to display
   component: ConfroomComponent
 },

{
 path: 'notification',                     //default component to display
 component: NotificationComponent
},
{
  path: 'kiosk',                     //default component to display
  component: KioskComponent
 },

 {
  path: 'confroom',                     //default component to display
  component: ConfroomComponent
 },

];


@NgModule({
  declarations: [
    AppComponent,
   NavigationMenuComponent,
    HomeComponent,
    NotificationComponent,
    KioskComponent,
    ConfroomComponent,
    DisplayerComponent,
    ProgressComponent,
   

    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes),PushNotificationsModule,
    GridModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 10000000,
    
    })
  ],
  providers: [EventService,DetailsService],
  // providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }



// key: m1fBr3Av6nUHKoStY6tA
// secret: OxmObFmejN5FHQuEWoZP9mfZk1OVcjRQdL0Xq1ueZE
