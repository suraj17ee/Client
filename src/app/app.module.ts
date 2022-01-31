import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './mainModule/header/header.component';
import { FooterComponent } from './mainModule/footer/footer.component';
import { SignupComponent } from './loginModule/signup/signup.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { DashboardComponent } from './dashboardModule/dashboard/dashboard.component';
import { SideNavigationComponent } from './dashboardModule/side-navigation/side-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatSliderModule } from '@angular/material/slider';
import { ForgetPasswordComponent } from './loginModule/forget-password/forget-password.component';
import { SetPasswordComponent } from './loginModule/set-password/set-password.component';
import { AccountDetailsComponent } from './dashboardModule/account-details/account-details.component';
import { CreateAccountComponent } from './dashboardModule/create-account/create-account.component';
import { FundTransferComponent } from './dashboardModule/fund-transfer/fund-transfer.component';
import { ProfileComponent } from './dashboardModule/profile/profile.component';
import { PopupComponent } from './sharedModule/popup/popup.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './dashboardModule/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    SideNavigationComponent,
    ForgetPasswordComponent,
    SetPasswordComponent,
    AccountDetailsComponent,
    CreateAccountComponent,
    FundTransferComponent,
    ProfileComponent,
    PopupComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatSliderModule,
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
