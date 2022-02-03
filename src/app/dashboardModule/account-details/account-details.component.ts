import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-account-details",
  templateUrl: "./account-details.component.html",
  styleUrls: ["./account-details.component.css"],
})
export class AccountDetailsComponent implements OnInit {
  userid: number | undefined;
  accounts: any = [];
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var userID: number = Number(localStorage.getItem("userId"));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
      console.log(this.accounts);
    });
  }
}
