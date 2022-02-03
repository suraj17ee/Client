import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { AccountStatementComponent } from "./account-statement/account-statement.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { DashboardComponent } from "./dashboard.component";
import { FundTransferComponent } from "./fund-transfer/fund-transfer.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";

const dashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "update-profile", component: UpdateProfileComponent },
      { path: "account-details", component: AccountDetailsComponent },
      { path: "create-account", component: CreateAccountComponent },
      { path: "fund-transfer", component: FundTransferComponent },
      { path: "account-statement", component: AccountStatementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
