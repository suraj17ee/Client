import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoginModuleService } from "../login-module.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: String = "";
  authListner: Subject<boolean> = new Subject();
  popupListner: Subject<boolean> = new Subject();

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginModuleService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.signinForm = fb.group({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get getSigninFormControls() {
    return this.signinForm.controls;
  }

  ngOnInit(): void {
    this.authListner = this.loginModuleService.getAuthListner();
  }

  submitForm() {
    const userLoginData = {
      email: this.signinForm.get("email")?.value,
      password: this.signinForm.get("password")?.value,
    };

    this.loginModuleService.loginUser(userLoginData).subscribe(
      (response) => {
        localStorage.setItem("userId", response);
        this.router.navigate(["/dashboard/home"]);
        this.authListner.next(true);
        this.createNotification(
          "success",
          "Success",
          "Logged-in Successfully",
          "topRight"
        );
      },
      (error: any) => {
        this.createNotification("error", "Error", "Error in login", "topRight");
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.signinForm.reset();
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
