import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"],
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  user: any = [];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.updateProfileForm = this.fb.group({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      age: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      dateofbirth: new FormControl("", [Validators.required]),
    });
  }

  get getUpdateProfileFormControls() {
    return this.updateProfileForm.controls;
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (response: any) => {
        this.user = response;
        this.setValues(this.user);
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setValues(user: any) {
    this.updateProfileForm.controls["firstname"].setValue(user.firstname);
    this.updateProfileForm.controls["lastname"].setValue(user.lastname);
    this.updateProfileForm.controls["gender"].setValue(user.gender);
    //this.updateProfileForm.controls["age"].setValue(user.age);
    this.updateProfileForm.controls["mobile"].setValue(user.mobile);
    this.updateProfileForm.controls["email"].setValue(user.email);
    this.updateProfileForm.controls["dateofbirth"].setValue(user.dateofbirth);
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + "yr";
    }
    return value;
  }

  submitForm() {
    var userID: number = Number(localStorage.getItem("userId"));

    const userProfileData = {
      userId: userID,
      firstname: this.updateProfileForm.get("firstname")?.value,
      lastname: this.updateProfileForm.get("lastname")?.value,
      mobile: this.updateProfileForm.get("mobile")?.value,
      gender: this.updateProfileForm.get("gender")?.value,
      age: this.updateProfileForm.get("age")?.value,
      email: this.updateProfileForm.get("email")?.value,
      dateofbirth: this.updateProfileForm.get("dateofbirth")?.value,
    };

    console.log(userProfileData);

    this.profileService.updateUserProfile(userProfileData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["../profile"]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.updateProfileForm.reset();
  }
}
