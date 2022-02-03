import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./mainModule/header/header.component";
import { FooterComponent } from "./mainModule/footer/footer.component";
import { SignupComponent } from "./loginModule/signup/signup.component";
import { SigninComponent } from "./loginModule/signin/signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {AgGridModule} from "ag-grid-angular";
import {MatTableModule} from '@angular/material/table';

import { MatSliderModule } from "@angular/material/slider";
import { ForgetPasswordComponent } from "./loginModule/forget-password/forget-password.component";
import { SetPasswordComponent } from "./loginModule/set-password/set-password.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { DashboardComponent } from "./dashboardModule/dashboard.component";
import { PopupMessageComponent } from "./sharedModule/popup-message/popup-message.component";
import { SideNavigationComponent } from "./mainModule/side-navigation/side-navigation.component";

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    SetPasswordComponent,
    PopupMessageComponent,
    SideNavigationComponent,
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
    MatTableModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
