import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { LoginModuleService } from "../login-module.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: boolean = true;
  authListner: Subject<boolean> = new Subject();

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginModuleService,
    private router: Router
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
      },
      (error: any) => {
        this.message = false;
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.signinForm.reset();
  }
}
