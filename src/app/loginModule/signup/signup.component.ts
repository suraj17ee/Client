import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModuleService } from '../login-module.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup =new FormGroup({
    firstname : new FormControl('',[Validators.required]),
    lastname : new FormControl('',[Validators.required]),
    phoneno : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    dateofbirth : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
  });

  get getSignupFormControls(){
    return this.signupForm.controls
  }
  
  constructor(private loginModuleService: LoginModuleService) { }

  ngOnInit(): void {
  }

  submitForm(){
    const userSaveData = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname : this.signupForm.get('lastname')?.value,
      phoneno : this.signupForm.get('phoneno')?.value,
      email : this.signupForm.get('email')?.value,
      dateofbirth : this.signupForm.get('dateofbirth')?.value,
      password : this.signupForm.get('password')?.value,
    };

    this.loginModuleService.saveUser(userSaveData).subscribe((response) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  cancelForm(){
    this.signupForm.reset
  }

}
