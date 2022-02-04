import { NgModule } from "@angular/core";

import { DashboardRouting } from "./dashboard.routing";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { FundTransferComponent } from "./fund-transfer/fund-transfer.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountStatementComponent } from "./account-statement/account-statement.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { MatSliderModule } from "@angular/material/slider";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [
    AccountDetailsComponent,
    CreateAccountComponent,
    AccountStatementComponent,
    FundTransferComponent,
    ProfileComponent,
    HomeComponent,
    UpdateProfileComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DashboardRouting,
    MatSliderModule,
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
})
export class DashboardModule {}
