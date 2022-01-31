import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './dashboardModule/create-account/create-account.component';
import { DashboardComponent } from './dashboardModule/dashboard/dashboard.component';
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
  { path: 'create-account', component:CreateAccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: SigninComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
