import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AccountService } from "src/app/services/account.service";
import { FundtransferService } from "src/app/services/fundtransfer.service";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-fund-transfer",
  templateUrl: "./fund-transfer.component.html",
  styleUrls: ["./fund-transfer.component.css"],
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup;
  iscreated: Boolean = false;
  accounts: any = [];

  constructor(
    fb: FormBuilder,
    private fundtransferService: FundtransferService,
    private router: Router,
    private accountService: AccountService,
    private notification: NzNotificationService
  ) {
    this.fundTransferForm = fb.group({
      fromAccount: new FormControl("", Validators.required),
      toAccount: new FormControl("", Validators.required),
      description: new FormControl("", [Validators.required]),
      balance: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  get getaccountFormControls() {
    return this.fundTransferForm.controls;
  }

  ngOnInit(): void {
    this.getData();
  }

  submitForm() {
    const accountData = {
      toAccount: this.fundTransferForm.get("toAccount")?.value,
      amount: this.fundTransferForm.get("balance")?.value,
      description: this.fundTransferForm.get("description")?.value,
      fromAccount: this.fundTransferForm.get("fromAccount")?.value,
      password: this.fundTransferForm.get("password")?.value,
    };
    this.fundtransferService.transfer(accountData).subscribe(
      (response: any) => {
        if (response.statusCode == 201) {
          this.createNotification(
            "success",
            "Success",
            response.message,
            "topRight"
          );
          this.router.navigate(["/dashboard/account-details"]);
        } else if (response.statusCode == 400) {
          this.createNotification(
            "error",
            "Error",
            response.message,
            "topRight"
          );
          this.router.navigate(["/dashboard/fund-transfer"]);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log(accountData);
  }

  cancelForm() {
    this.fundTransferForm.reset();
  }

  getData() {
    var userID: number = Number(localStorage.getItem("userId"));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
    });
  }

  createNotification(
    type: string,
    title: string,
    message: string,
    position: any
  ) {
    this.notification.create(type, title, message, { nzPlacement: "topRight" });
  }
}
