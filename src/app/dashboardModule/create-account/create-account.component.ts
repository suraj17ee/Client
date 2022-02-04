import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  iscreated: Boolean = false;
  message: String = "";

  constructor(
    fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.createAccountForm = fb.group({
      accountType: new FormControl("", [Validators.required]),
      balance: new FormControl("", [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createAccountForm.controls;
  }

  ngOnInit(): void {}

  submitForm() {
    var userID: number = Number(localStorage.getItem("userId"));

    const accountData = {
      accountType: this.createAccountForm.get("accountType")?.value,
      balance: this.createAccountForm.get("balance")?.value,
      userId: userID,
    };
    this.accountService.saveAccount(accountData).subscribe(
      (response: any) => {
        if (response.statusCode == 201) {
          this.createNotification("success", "Success", response.message);
          this.router.navigate(["/dashboard/account-details"]);
        } else {
          this.createNotification("error", "Error", response.message);
          this.router.navigate(["/create-account"]);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.createAccountForm.reset();
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: "50px",
      },
    });
  }
}
