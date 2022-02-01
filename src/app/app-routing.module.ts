import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './dashboardModule/account-details/account-details.component';
import { CreateAccountComponent } from './dashboardModule/create-account/create-account.component';
import { DashboardComponent } from './dashboardModule/dashboard/dashboard.component';
import { HomeComponent } from './dashboardModule/home/home.component';
import { ProfileComponent } from './dashboardModule/profile/profile.component';
import { ForgetPasswordComponent } from './loginModule/forget-password/forget-password.component';
import { SetPasswordComponent } from './loginModule/set-password/set-password.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { SignupComponent } from './loginModule/signup/signup.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'set-password/:email/:token', component: SetPasswordComponent },
  { path: 'account-details', component:AccountDetailsComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
