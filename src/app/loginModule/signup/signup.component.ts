import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModuleService } from '../login-module.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(fb: FormBuilder, private loginModuleService: LoginModuleService, private router: Router) {
    this.signupForm = fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      dateofbirth: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get getSignupFormControls() {
    return this.signupForm.controls
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return (value) + 'yrs';
    }
    return value;
  }

  submitForm() {
    const userSaveData = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      phoneno: this.signupForm.get('phoneno')?.value,
      gender: this.signupForm.get('gender')?.value,
      age: this.signupForm.get('age')?.value,
      email: this.signupForm.get('email')?.value,
      dateofbirth: this.signupForm.get('dateofbirth')?.value,
      password: this.signupForm.get('password')?.value,
    };

    this.loginModuleService.saveUser(userSaveData).subscribe((response) => {
      console.log(response)
      this.router.navigate(['/dashboard'])
    },
      (error: any) => {
        console.log(error)
      }
    );
  }

  cancelForm() {
    this.signupForm.reset()
  }

}