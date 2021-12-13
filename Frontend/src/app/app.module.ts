import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainHomeComponent } from './main-home-nav/main-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { EditDetailsFormComponent } from './edit-details-form/edit-details-form.component';

import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { TrainerDashboardComponent } from './trainer-nav/trainer-dashboard.component';
import { AllocationComponent } from './allocation/allocation.component';
import { HomeComponent } from './home/home.component';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { AdmindashComponent } from './admindash/admindash.component';


@NgModule({
  declarations: [
    AppComponent,

    MainHomeComponent,
    SignUpComponent,
    LoginComponent,
    EditDetailsFormComponent,

    TrainerprofileComponent,
    TrainerDashboardComponent,
    AllocationComponent,
    HomeComponent,
    AdminnavComponent,
    AdmindashComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
